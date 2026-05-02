import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { Express } from 'express';
import { DriveFileDto, DriveListingDto, DriveSubfolderDto } from './others/drive-listing.dto';

@Injectable()
export class GoogleDriveService {
  private driveClient: ReturnType<typeof google.drive>;
  private readonly defaultFolderId?: string;

  constructor() {
    const oauthClient = this.createOAuthClient();
    this.defaultFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() || undefined;

    this.driveClient = google.drive({ version: 'v3', auth: oauthClient });
  }

  private createOAuthClient() {
    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET?.trim();
    const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN?.trim();
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI?.trim() || 'https://developers.google.com/oauthplayground';

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error(
        'Faltan credenciales OAuth de Google Drive. Define GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET y GOOGLE_DRIVE_REFRESH_TOKEN.',
      );
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    return oauth2Client;
  }

  private resolveFolderId(folderId?: string): string {
    const resolvedFolderId = folderId?.trim() || this.defaultFolderId;
    if (!resolvedFolderId) {
      throw new Error('Debes enviar un folderId o definir GOOGLE_DRIVE_FOLDER_ID.');
    }

    return resolvedFolderId;
  }

  async createFolder(folderName: string, parentFolderId?: string): Promise<string> {
    try {
      const resolvedParentFolderId = parentFolderId?.trim() || this.defaultFolderId;
      const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false` +
        (resolvedParentFolderId ? ` and '${resolvedParentFolderId}' in parents` : '');

      const response = await this.driveClient.files.list({
        q: query,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: 'files(id, name)',
      });

      if (response.data.files && response.data.files.length > 0) {
        console.log(`La carpeta '${folderName}' ya existe.`);
        return response.data.files[0].id!;
      }

      const folderMetadata: any = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };

      if (resolvedParentFolderId) {
        folderMetadata.parents = [resolvedParentFolderId];
      }

      const folder = await this.driveClient.files.create({
        requestBody: folderMetadata,
        supportsAllDrives: true,
        fields: 'id',
      });

      console.log(`Carpeta creada con ID: ${folder.data.id}`);
      return folder.data.id!;
    } catch (error) {
      console.error('Error creando la carpeta:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo crear la carpeta en Google Drive');
    }
  }

  async getFileOrFolderInfo(fileOrFolderId: string) {
    try {
      const response = await this.driveClient.files.get({
        fileId: fileOrFolderId,
        supportsAllDrives: true,
        fields: 'id, name, mimeType, webViewLink',
      });

      const file = response.data;

      if (!file) {
        throw new Error('No se encontró el archivo o carpeta.');
      }

      return {
        id: file.id,
        name: file.name,
        type: file.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
        url: file.webViewLink || null,
      };
    } catch (error) {
      console.error('Error obteniendo información:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo obtener la información del archivo o carpeta');
    }
  }

  async deleteFileByUrl(fileUrl: string): Promise<void> {
    try {
      const fileId = this.extractId(fileUrl);
      if (!fileId) {
        throw new Error('No se pudo extraer el ID del archivo de la URL proporcionada.');
      }

      await this.driveClient.files.delete({ fileId, supportsAllDrives: true });
      console.log(`Archivo con ID ${fileId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error eliminando el archivo:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo eliminar el archivo de Google Drive');
    }
  }

  async downloadFileByUrl(fileUrl: string): Promise<{ stream: Readable; fileName: string; mimeType: string }> {
    try {
      const fileId = this.extractId(fileUrl);
      if (!fileId) {
        throw new Error('No se pudo extraer el ID del archivo de la URL proporcionada.');
      }

      const metadataResponse = await this.driveClient.files.get({
        fileId,
        supportsAllDrives: true,
        fields: 'id, name, mimeType',
      });

      const fileName = metadataResponse.data.name || 'archivo-descargado';
      const mimeType = metadataResponse.data.mimeType || 'application/octet-stream';

      const downloadResponse = await this.driveClient.files.get(
        {
          fileId,
          alt: 'media',
          supportsAllDrives: true,
        },
        { responseType: 'stream' },
      );

      return {
        stream: downloadResponse.data as Readable,
        fileName,
        mimeType,
      };
    } catch (error) {
      console.error('Error descargando el archivo:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo descargar el archivo de Google Drive');
    }
  }

  async uploadFileToFolderById(file: Express.Multer.File, folderId?: string) {
    try {
      const resolvedFolderId = folderId?.trim() || this.defaultFolderId || 'root';
      const fileMetadata = {
        name: file.originalname,
        parents: [resolvedFolderId],
      };

      const media = {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      };

      const response = await this.driveClient.files.create({
        requestBody: fileMetadata,
        media,
        supportsAllDrives: true,
        fields: 'id, webViewLink',
      });

      const fileId = response.data.id;
      if (!fileId) {
        throw new Error('El archivo no tiene un ID válido después de crearse.');
      }

      await this.driveClient.permissions.create({
        fileId,
        supportsAllDrives: true,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      console.log('Archivo subido y compartido:', response.data);
      return {
        fileId,
        fileUrl: response.data.webViewLink,
      };
    } catch (error) {
      console.error('Error subiendo el archivo:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo subir el archivo a Google Drive');
    }
  }

  async listFilesAndFolders(parentFolderId?: string) {
    try {
      const resolvedFolderId = parentFolderId?.trim() || this.defaultFolderId;
      const query = resolvedFolderId
        ? `'${resolvedFolderId}' in parents and trashed=false`
        : `'root' in parents and trashed=false`;

      const response = await this.driveClient.files.list({
        q: query,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: 'files(id, name, mimeType)',
      });

      if (!response.data.files || !response.data.files.length) {
        console.log('No se encontraron archivos ni carpetas.');
        return [];
      }

      return response.data.files.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.mimeType === 'application/vnd.google-apps.folder' ? 'folder' : 'file',
      }));
    } catch (error) {
      console.error('Error obteniendo la lista de archivos y carpetas:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo obtener la lista de archivos y carpetas');
    }
  }

  async shareWithUser(fileOrFolderId: string, userEmail: string, role: 'reader' | 'writer' = 'writer') {
    try {
      await this.driveClient.permissions.create({
        fileId: fileOrFolderId,
        supportsAllDrives: true,
        requestBody: {
          role,
          type: 'user',
          emailAddress: userEmail,
        },
      });
      console.log(`Compartido con ${userEmail}`);
    } catch (error) {
      console.error('Error compartiendo el archivo o carpeta:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo compartir el archivo o carpeta');
    }
  }

  async listSubfoldersAndFiles(inputIdOrUrl: string): Promise<DriveListingDto> {
    try {
      const parentFolderId = this.extractId(inputIdOrUrl) || this.defaultFolderId;
      if (!parentFolderId) {
        throw new Error('No se pudo extraer un ID válido del input proporcionado.');
      }

      // Paso 1: Listar subcarpetas
      const subfolders = await this.driveClient.files.list({
        q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: 'files(id, name)',
      });

      const subfolderResults: DriveSubfolderDto[] = [];

      for (const subfolder of subfolders.data.files || []) {
        // Paso 2: Para cada subcarpeta, listar archivos
        const filesResp = await this.driveClient.files.list({
          q: `'${subfolder.id}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed=false`,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          fields: 'files(id, name, mimeType, webViewLink)',
        });

        const files: DriveFileDto[] = (filesResp.data.files || []).map((file) => ({
          id: file.id!,
          name: file.name!,
          mimeType: file.mimeType!,
          url: file.webViewLink || null,
        }));

        subfolderResults.push({
          id: subfolder.id!,
          name: subfolder.name!,
          files,
        });
      }

      return {
        parentFolderId,
        subfolders: subfolderResults,
      };
    } catch (error) {
      console.error('Error en listSubfoldersAndFiles:', error);
      throw this.mapGoogleDriveError(error, 'No se pudo obtener la estructura de carpetas y archivos');
    }
  }

  private extractId(input: string): string | null {
    // Caso 1: ID directo
    if (/^[a-zA-Z0-9_-]{10,}$/.test(input)) {
      return input;
    }

    // Caso 2: URL con /file/d/FILE_ID
    let match = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Caso 3: URL con open?id=FILE_ID
    match = input.match(/open\?id=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Caso 4: URL con uc?id=FILE_ID
    match = input.match(/uc\?id=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Caso 5: URL con /folders/FOLDER_ID
    match = input.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Si nada matchea
    return null;
  }

  private mapGoogleDriveError(error: unknown, fallbackMessage: string): Error {
    const googleError = error as {
      code?: number;
      message?: string;
      response?: { status?: number; data?: { error?: { message?: string } } };
      cause?: { message?: string; code?: number };
    };

    const status = googleError.response?.status ?? googleError.code ?? googleError.cause?.code;
    const message = googleError.response?.data?.error?.message ?? googleError.message ?? googleError.cause?.message ?? '';
    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage.includes('service accounts do not have storage quota')) {
      throw new HttpException(
        'La cuenta de servicio no puede almacenar archivos en un My Drive personal. Usa un Shared Drive o habilita OAuth delegation con un usuario.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (normalizedMessage.includes('project #') && normalizedMessage.includes('has been deleted')) {
      throw new HttpException(
        'Las credenciales de Google apuntan a un proyecto eliminado o inválido. Genera una nueva key JSON en un proyecto activo.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (status === 403 && normalizedMessage.includes('sharing quota')) {
      throw new HttpException(
        'Google Drive agotó la cuota de compartidos. Intenta más tarde o usa otra cuenta de servicio.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (status === 403) {
      throw new HttpException(
        'Google Drive rechazó la operación de permisos. Revisa si la cuenta de servicio tiene acceso suficiente.',
        HttpStatus.FORBIDDEN,
      );
    }

    return new Error(fallbackMessage);
  }
}
