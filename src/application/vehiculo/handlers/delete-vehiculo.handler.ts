import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVehiculoCommand } from '../commands/delete-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteVehiculoCommand)
@Injectable()
export class DeleteVehiculoHandler
  implements ICommandHandler<DeleteVehiculoCommand>
{
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: DeleteVehiculoCommand) {
    try {
      const result = await this.vehiculoRepository.deleteVehiculo(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Vehículo no encontrado', 404);
      }
      return ResponseUtil.success(
        null,
        'Vehículo eliminado exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en DeleteVehiculoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al eliminar el vehículo';
      return ResponseUtil.error(message, status);
    }
  }
}
