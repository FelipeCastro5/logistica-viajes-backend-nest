import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetLugarByIdCommand } from '../commands/get-lugar-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { LugarInterface } from '../../../domain/lugar-domain/lugar.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetLugarByIdCommand)
@Injectable()
export class GetLugarByIdHandler implements IQueryHandler<GetLugarByIdCommand> {
  constructor(
    @Inject('LugarInterface')
    private readonly lugarRepository: LugarInterface,
  ) {}

  async execute(command: GetLugarByIdCommand) {
    try {
      const lugar = await this.lugarRepository.getById(command.id);
      if (!lugar) {
        return ResponseUtil.error('Lugar no encontrado', 404);
      }
      return ResponseUtil.success(lugar, 'Lugar obtenido exitosamente');
    } catch (error) {
      console.error('Error en GetLugarByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el lugar';
      return ResponseUtil.error(message, status);
    }
  }
}
