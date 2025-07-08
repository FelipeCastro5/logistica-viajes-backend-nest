// get-manifiesto-by-id.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetManifiestoByIdCommand } from '../commands/get-manifiesto-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetManifiestoByIdCommand)
@Injectable()
export class GetManifiestoByIdHandler implements IQueryHandler<GetManifiestoByIdCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(command: GetManifiestoByIdCommand) {
    try {
      const manifiesto = await this.manifiestoRepository.getById(command.id);
      if (!manifiesto) {
        return ResponseUtil.error('Manifiesto no encontrado', 404);
      }
      return ResponseUtil.success(manifiesto, 'Manifiesto encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetManifiestoByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el manifiesto';
      return ResponseUtil.error(message, status);
    }
  }
}
