import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVehiculoCommand } from '../commands/update-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { parsePlaca } from '../../utilities/placa.util'; // 🔹 importamos la función de parseo

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(UpdateVehiculoCommand)
@Injectable()
export class UpdateVehiculoHandler implements ICommandHandler<UpdateVehiculoCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param vehiculoRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: UpdateVehiculoCommand) {
        try {
          // 🔹 Validamos y normalizamos la placa
          const placaParsed = parsePlaca(command.placa);
          if (!placaParsed.valid) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error(placaParsed.message, 400);
          }

          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.

          const result = await this.vehiculoRepository.updateVehiculo(
            command.id,
            command.fk_usuario,
            placaParsed.value, // usamos la placa normalizada
            command.marca,
            command.configuracion,
            command.tipo_vehiculo,
            command.peso_vacio,
            command.peso_remolque,
          );

          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.

          if (!result?.rowCount) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error('Vehículo no encontrado', 404);
          }

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(
            null,
            'Vehículo actualizado exitosamente',
            200,
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en UpdateVehiculoHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al actualizar el vehículo';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
