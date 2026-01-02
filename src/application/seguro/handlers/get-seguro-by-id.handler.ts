import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetSeguroByIdCommand } from '../commands/get-seguro-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetSeguroByIdCommand)
@Injectable()
export class GetSeguroByIdHandler
  implements IQueryHandler<GetSeguroByIdCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute(command: GetSeguroByIdCommand) {
    try {
      const seguro = await this.seguroRepository.getById(command.id);
      if (!seguro) {
        return ResponseUtil.error('Seguro no encontrado', 404);
      }
      return ResponseUtil.success(
        seguro,
        'Seguro encontrado exitosamente',
      );
    } catch (error) {
      console.error('Error en GetSeguroByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el seguro';
      return ResponseUtil.error(message, status);
    }
  }
}
