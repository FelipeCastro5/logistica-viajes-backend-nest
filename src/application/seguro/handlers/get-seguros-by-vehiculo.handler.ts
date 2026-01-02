import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetSegurosByVehiculoCommand } from '../commands/get-seguros-by-vehiculo.command';

@QueryHandler(GetSegurosByVehiculoCommand)
@Injectable()
export class GetSegurosByVehiculoHandler
  implements IQueryHandler<GetSegurosByVehiculoCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute(command: GetSegurosByVehiculoCommand) {
    try {
      const seguros =
        await this.seguroRepository.getSegurosByVehiculo(
          command.fk_vehiculo,
        );

      if (!seguros || seguros.length === 0) {
        return ResponseUtil.error('Seguros no encontrados', 404);
      }

      return ResponseUtil.success(
        seguros,
        'Seguros encontrados exitosamente',
      );
    } catch (error) {
      console.error('Error en GetSegurosByVehiculoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener los seguros';
      return ResponseUtil.error(message, status);
    }
  }
}
