import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVehiculoCommand } from '../commands/create-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { parsePlaca } from '../../utilities/placa.util'; // 🔹 importamos

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@CommandHandler(CreateVehiculoCommand)
@Injectable()
export class CreateVehiculoHandler implements ICommandHandler<CreateVehiculoCommand> {
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
    async execute(command: CreateVehiculoCommand) {
        try {
          // 🔹 parseamos y validamos la placa
          const placaParsed = parsePlaca(command.placa);
          if (!placaParsed.valid) {
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error(placaParsed.message, 400);
          }

          // 1. Ejecutamos la operación en el repositorio utilizando los datos del comando.

          const vehiculo = await this.vehiculoRepository.createVehiculo(
            command.fk_usuario,
            placaParsed.value, // usamos la placa normalizada
            command.marca,
            command.configuracion,
            command.tipo_vehiculo,
            command.peso_vacio,
            command.peso_remolque,
          );

          // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

          return ResponseUtil.success(
            vehiculo,
            'Vehículo creado exitosamente',
            201,
          );
        } catch (error) {
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en CreateVehiculoHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          const message =
            error.response?.message || 'Error al crear el vehículo';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
