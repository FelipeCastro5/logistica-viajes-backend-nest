import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVehiculoCommand } from '../commands/create-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateVehiculoCommand)
@Injectable()
export class CreateVehiculoHandler
  implements ICommandHandler<CreateVehiculoCommand>
{
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: CreateVehiculoCommand) {
    try {
      const vehiculo = await this.vehiculoRepository.createVehiculo(
        command.fk_usuario,
        command.placa,
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
