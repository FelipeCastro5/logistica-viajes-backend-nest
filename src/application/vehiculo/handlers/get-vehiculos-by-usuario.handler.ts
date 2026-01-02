import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetVehiculosByUsuarioCommand } from '../commands/get-vehiculos-by-usuario.command';

@QueryHandler(GetVehiculosByUsuarioCommand)
@Injectable()
export class GetVehiculosByUsuarioHandler
  implements IQueryHandler<GetVehiculosByUsuarioCommand>
{
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: GetVehiculosByUsuarioCommand) {
    try {
      const vehiculos =
        await this.vehiculoRepository.getVehiculosByUsuario(
          command.fk_usuario,
        );
      if (!vehiculos || vehiculos.length === 0) {
        return ResponseUtil.error('Vehículos no encontrados', 404);
      }
      return ResponseUtil.success(
        vehiculos,
        'Vehículos encontrados exitosamente',
      );
    } catch (error) {
      console.error('Error en GetVehiculosByUsuarioHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener los vehículos';
      return ResponseUtil.error(message, status);
    }
  }
}
