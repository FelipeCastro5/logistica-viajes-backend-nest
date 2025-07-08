import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllLugaresCommand } from '../commands/get-all-lugares.command';
import { Inject, Injectable } from '@nestjs/common';
import { LugarInterface } from '../../../domain/lugar-domain/lugar.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllLugaresCommand)
@Injectable()
export class GetAllLugaresHandler implements IQueryHandler<GetAllLugaresCommand> {
  constructor(
    @Inject('LugarInterface')
    private readonly lugarRepository: LugarInterface,
  ) {}

  async execute() {
    try {
      const lugares = await this.lugarRepository.getAll();
      return ResponseUtil.success(lugares, 'Lugares obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllLugaresHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los lugares';
      return ResponseUtil.error(message, status);
    }
  }
}
