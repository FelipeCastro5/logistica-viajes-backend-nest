import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllRemesasCommand } from '../commands/get-all-remesas.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllRemesasCommand)
@Injectable()
export class GetAllRemesasHandler
  implements IQueryHandler<GetAllRemesasCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute() {
    try {
      const remesas = await this.remesaRepository.getAll();

      if (!remesas || remesas.length === 0) {
        return ResponseUtil.error('Remesas no encontradas', 404);
      }

      return ResponseUtil.success(remesas, 'Remesas obtenidas exitosamente');
    } catch (error) {
      console.error('Error en GetAllRemesasHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener las remesas';
      return ResponseUtil.error(message, status);
    }
  }
}
