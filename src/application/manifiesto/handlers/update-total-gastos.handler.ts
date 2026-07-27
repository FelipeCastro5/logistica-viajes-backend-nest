import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTotalGastosCommand } from '../commands/update-total-gastos.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(UpdateTotalGastosCommand)
@Injectable()
export class UpdateTotalGastosHandler implements ICommandHandler<UpdateTotalGastosCommand> {
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
    async execute(command: UpdateTotalGastosCommand) {
        const { fk_viaje } = command;

        try {
          // Obtener total de gastos según el viaje
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const totalGastos = await this.manifiestoRepository.getTotalGastosByViajeId(fk_viaje);

          // Actualizar el manifiesto usando ese total
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const result = await this.manifiestoRepository.updateTotalGastosManifiesto(fk_viaje, totalGastos);

          if (result?.rowCount === 1) {
            // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.
            return ResponseUtil.success(
              { updated: true, total_gastos: totalGastos },
              'Total de gastos actualizado correctamente'
            );
          }

          // Devolvemos la respuesta de error estandarizada al cliente.

          return ResponseUtil.error(
            'No se actualizó ningún manifiesto. Verifique que el viaje tenga un manifiesto asociado.',
            404
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en UpdateTotalGastosHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al actualizar total_gastos';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
