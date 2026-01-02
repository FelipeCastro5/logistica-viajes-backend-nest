import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRemesaByIdCommand } from '../commands/get-remesa-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetRemesaByIdCommand)
@Injectable()
export class GetRemesaByIdHandler
  implements IQueryHandler<GetRemesaByIdCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute(command: GetRemesaByIdCommand) {
    try {
      const remesa = await this.remesaRepository.getById(command.id);
      if (!remesa) {
        return ResponseUtil.error('Remesa no encontrada', 404);
      }
      return ResponseUtil.success(remesa, 'Remesa encontrada exitosamente');
    } catch (error) {
      console.error('Error en GetRemesaByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener la remesa';
      return ResponseUtil.error(message, status);
    }
  }
}
