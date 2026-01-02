import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRemesasByViajeCommand } from '../commands/get-remesas-by-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetRemesasByViajeCommand)
@Injectable()
export class GetRemesasByViajeHandler
  implements IQueryHandler<GetRemesasByViajeCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute(command: GetRemesasByViajeCommand) {
    try {
      const remesas = await this.remesaRepository.getRemesasByViaje(
        command.fk_viaje,
      );

      if (!remesas || remesas.length === 0) {
        return ResponseUtil.error('Remesas no encontradas', 404);
      }

      return ResponseUtil.success(
        remesas,
        'Remesas encontradas exitosamente',
      );
    } catch (error) {
      console.error('Error en GetRemesasByViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener las remesas';
      return ResponseUtil.error(message, status);
    }
  }
}
