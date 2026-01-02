import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetVehiculoByIdCommand } from '../commands/get-vehiculo-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetVehiculoByIdCommand)
@Injectable()
export class GetVehiculoByIdHandler
  implements IQueryHandler<GetVehiculoByIdCommand>
{
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: GetVehiculoByIdCommand) {
    try {
      const vehiculo = await this.vehiculoRepository.getById(command.id);
      if (!vehiculo) {
        return ResponseUtil.error('Vehículo no encontrado', 404);
      }
      return ResponseUtil.success(
        vehiculo,
        'Vehículo encontrado exitosamente',
      );
    } catch (error) {
      console.error('Error en GetVehiculoByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener el vehículo';
      return ResponseUtil.error(message, status);
    }
  }
}
