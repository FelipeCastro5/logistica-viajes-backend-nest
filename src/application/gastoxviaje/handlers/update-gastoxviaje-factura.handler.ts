import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { UpdateGastoXViajeFacturaCommand } from '../commands/update-gastoxviaje-factura.command';
import { GoogleDriveService } from '../../../infrastructure/google-drive-api/google-drive.service';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(UpdateGastoXViajeFacturaCommand)
@Injectable()
export class UpdateGastoxviajeFacturaHandler implements ICommandHandler<UpdateGastoXViajeFacturaCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param repository Dependencia inyectada para el uso dentro del manejador.
     * @param googleDriveService Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: UpdateGastoXViajeFacturaCommand) {
        let uploadedFileId: string | null = null;
        let uploadedFileUrl: string | null = null;

        console.log('[gastoxviaje:update-factura] inicio', {
          id_gastoxviaje: command.id_gastoxviaje,
          fileName: command.file?.originalname,
          mimeType: command.file?.mimetype,
          size: command.file?.size,
        });

        try {
          console.log('[gastoxviaje:update-factura] subiendo archivo a Drive');
          const uploaded = await this.googleDriveService.uploadFileToFolderById(command.file);
          console.log('[gastoxviaje:update-factura] archivo subido a Drive', uploaded);

          uploadedFileId = uploaded.fileId;
          uploadedFileUrl = uploaded.fileUrl || `https://drive.google.com/file/d/${uploaded.fileId}/view`;

          console.log('[gastoxviaje:update-factura] actualizando registro en base de datos', {
            id_gastoxviaje: command.id_gastoxviaje,
            uploadedFileId,
            uploadedFileUrl,
          });

          const updated = await this.repository.updateGastoxviajeFactura(
            command.id_gastoxviaje,
            uploadedFileUrl,
            uploadedFileId,
          );

          console.log('[gastoxviaje:update-factura] resultado update', updated);

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!updated) {
            console.warn('[gastoxviaje:update-factura] el update no devolvió fila, se elimina el archivo subido', {
              uploadedFileId,
            });
            await this.googleDriveService.deleteFileByUrl(uploadedFileId);
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Gasto por viaje no encontrado', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(updated, 'Factura subida y asociada al gasto por viaje exitosamente', 200);
        } catch (error) {
          if (uploadedFileId) {
            try {
              console.warn('[gastoxviaje:update-factura] rollback: eliminando archivo subido tras error', {
                uploadedFileId,
              });
              await this.googleDriveService.deleteFileByUrl(uploadedFileId);
            } catch (rollbackError) {
              // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
              // Registramos el error internamente para depuración técnica.
              console.error('Error haciendo rollback del archivo subido:', rollbackError);
            }
          }

          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).

          // Registramos el error internamente para depuración técnica.

          console.error('Error en UpdateGastoxviajeFacturaHandler:', error);
          const failure = error as {
            getStatus?: () => number;
            response?: { message?: string };
            message?: string;
          };
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = failure.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = failure.response?.message || failure.message || 'Error al subir la factura';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}