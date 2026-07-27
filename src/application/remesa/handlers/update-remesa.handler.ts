import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRemesaCommand } from '../commands/update-remesa.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(UpdateRemesaCommand)
@Injectable()
export class UpdateRemesaHandler
  implements ICommandHandler<UpdateRemesaCommand>
{
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param remesaRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: UpdateRemesaCommand) {
        try {
          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.
          const result = await this.remesaRepository.updateRemesa(
            command.id_remesa,
            command.fk_viaje,
            command.numero_remesa,
            command.numero_autorizacion,
            command.tipo_empaque,
            command.naturaleza_carga,
            command.codigo_armonizado,
            command.cantidad,
            command.unidad_medida,
            command.peso_total,
            command.mercancia_peligrosa,
            command.observaciones,
            // 🔴 MERCANCÍA PELIGROSA
            command.id_mercancia,
            command.codigo_un,
            command.grupo_riesgo,
            command.caracteristica_peligrosidad,
            command.embalaje_envase,
          );

          if (!result?.updateRemesa?.rowCount) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Remesa no encontrada', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(null, 'Remesa actualizada exitosamente', 200);
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en UpdateRemesaHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al actualizar la remesa';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
