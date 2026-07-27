import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { DeleteGastoXViajeFacturaCommand } from '../commands/delete-gastoxviaje-factura.command';
import { GoogleDriveService } from '../../../infrastructure/google-drive-api/google-drive.service';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(DeleteGastoXViajeFacturaCommand)
@Injectable()
export class DeleteGastoxviajeFacturaHandler implements ICommandHandler<DeleteGastoXViajeFacturaCommand> {
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
    async execute(command: DeleteGastoXViajeFacturaCommand) {
        try {
          const gasto = await this.repository.getById(command.id_gastoxviaje);

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!gasto) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Gasto por viaje no encontrado', 404);
          }

          const fileReference = gasto.id_factura || gasto.url_factura;

          if (fileReference) {
            await this.googleDriveService.deleteFileByUrl(fileReference);
          }

          const updated = await this.repository.clearGastoxviajeFactura(command.id_gastoxviaje);

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!updated) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Gasto por viaje no encontrado al limpiar la factura', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(updated, 'Factura eliminada del Drive y desvinculada del gasto por viaje', 200);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en DeleteGastoxviajeFacturaHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || error.message || 'Error al eliminar la factura';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}