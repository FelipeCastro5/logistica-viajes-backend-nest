// delete-manifiesto.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteManifiestoCommand } from '../commands/delete-manifiesto.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(DeleteManifiestoCommand)
@Injectable()
export class DeleteManifiestoHandler implements ICommandHandler<DeleteManifiestoCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param manifiestoRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: DeleteManifiestoCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const result = await this.manifiestoRepository.deleteManifiesto(command.id);
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!result?.rowCount) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Manifiesto no encontrado', 404);
          }
          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
          return ResponseUtil.success(null, 'Manifiesto eliminado exitosamente', 200);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en DeleteManifiestoHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al eliminar el manifiesto';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
