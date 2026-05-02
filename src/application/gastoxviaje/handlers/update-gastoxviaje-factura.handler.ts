import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { UpdateGastoXViajeFacturaCommand } from '../commands/update-gastoxviaje-factura.command';
import { GoogleDriveService } from '../../../infrastructure/google-drive-api/google-drive.service';

@CommandHandler(UpdateGastoXViajeFacturaCommand)
@Injectable()
export class UpdateGastoxviajeFacturaHandler implements ICommandHandler<UpdateGastoXViajeFacturaCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async execute(command: UpdateGastoXViajeFacturaCommand) {
    let uploadedFileId: string | null = null;
    let uploadedFileUrl: string | null = null;

    try {
      const uploaded = await this.googleDriveService.uploadFileToFolderById(command.file);
      uploadedFileId = uploaded.fileId;
      uploadedFileUrl = uploaded.fileUrl || `https://drive.google.com/file/d/${uploaded.fileId}/view`;

      const updated = await this.repository.updateGastoxviajeFactura(
        command.id_gastoxviaje,
        uploadedFileUrl,
        uploadedFileId,
      );

      if (!updated) {
        await this.googleDriveService.deleteFileByUrl(uploadedFileId);
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }

      return ResponseUtil.success(updated, 'Factura subida y asociada al gasto por viaje exitosamente', 200);
    } catch (error) {
      if (uploadedFileId) {
        try {
          await this.googleDriveService.deleteFileByUrl(uploadedFileId);
        } catch (rollbackError) {
          console.error('Error haciendo rollback del archivo subido:', rollbackError);
        }
      }

      console.error('Error en UpdateGastoxviajeFacturaHandler:', error);
      const failure = error as {
        getStatus?: () => number;
        response?: { message?: string };
        message?: string;
      };
      const status = failure.getStatus?.() ?? 500;
      const message = failure.response?.message || failure.message || 'Error al subir la factura';
      return ResponseUtil.error(message, status);
    }
  }
}