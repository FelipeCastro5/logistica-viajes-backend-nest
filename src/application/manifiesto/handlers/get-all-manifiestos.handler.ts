// get-all-manifiestos.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllManifiestosCommand } from '../commands/get-all-manifiestos.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllManifiestosCommand)
@Injectable()
export class GetAllManifiestosHandler implements IQueryHandler<GetAllManifiestosCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const manifiestos = await this.manifiestoRepository.getAll();
      return ResponseUtil.success(manifiestos, 'Manifiestos obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllManifiestosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los manifiestos';
      return ResponseUtil.error(message, status);
    }
  }
}
