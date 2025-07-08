import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetViajeByIdCommand } from '../commands/get-viaje-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetViajeByIdCommand)
@Injectable()
export class GetViajeByIdHandler implements IQueryHandler<GetViajeByIdCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(command: GetViajeByIdCommand) {
    try {
      const viaje = await this.viajeRepository.getById(command.id);
      if (!viaje) {
        return ResponseUtil.error('Viaje no encontrado', 404);
      }
      return ResponseUtil.success(viaje, 'Viaje encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetViajeByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
