import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllViajesCommand } from '../commands/get-all-viajes.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllViajesCommand)
@Injectable()
export class GetAllViajesHandler implements IQueryHandler<GetAllViajesCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const viajes = await this.viajeRepository.getAll();
      return ResponseUtil.success(viajes, 'Viajes obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllViajesHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los viajes';
      return ResponseUtil.error(message, status);
    }
  }
}
