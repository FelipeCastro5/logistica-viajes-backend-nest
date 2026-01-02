import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllVehiculosCommand } from '../commands/get-all-vehiculos.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllVehiculosCommand)
@Injectable()
export class GetAllVehiculosHandler
  implements IQueryHandler<GetAllVehiculosCommand>
{
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute() {
    try {
      const vehiculos = await this.vehiculoRepository.getAll();
      if (!vehiculos || vehiculos.length === 0) {
        return ResponseUtil.error('Vehículos no encontrados', 404);
      }
      return ResponseUtil.success(
        vehiculos,
        'Vehículos obtenidos exitosamente',
      );
    } catch (error) {
      console.error('Error en GetAllVehiculosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener los vehículos';
      return ResponseUtil.error(message, status);
    }
  }
}
