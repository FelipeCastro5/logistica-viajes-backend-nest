import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVehiculoCommand } from '../commands/create-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { parsePlaca } from '../../utilities/placa.util'; // 🔹 importamos

@CommandHandler(CreateVehiculoCommand)
@Injectable()
export class CreateVehiculoHandler implements ICommandHandler<CreateVehiculoCommand> {
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: CreateVehiculoCommand) {
    try {
      // 🔹 parseamos y validamos la placa
      const placaParsed = parsePlaca(command.placa);
      if (!placaParsed.valid) {
        return ResponseUtil.error(placaParsed.message, 400);
      }

      const vehiculo = await this.vehiculoRepository.createVehiculo(
        command.fk_usuario,
        placaParsed.value, // usamos la placa normalizada
        command.marca,
        command.configuracion,
        command.tipo_vehiculo,
        command.peso_vacio,
        command.peso_remolque,
      );

      return ResponseUtil.success(
        vehiculo,
        'Vehículo creado exitosamente',
        201,
      );
    } catch (error) {
      console.error('Error en CreateVehiculoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al crear el vehículo';
      return ResponseUtil.error(message, status);
    }
  }
}
