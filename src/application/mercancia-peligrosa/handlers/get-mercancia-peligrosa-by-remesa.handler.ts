import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMercanciaPeligrosaByRemesaCommand } from '../commands/get-mercancia-peligrosa-by-remesa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetMercanciaPeligrosaByRemesaCommand)
@Injectable()
export class GetMercanciaPeligrosaByRemesaHandler
  implements IQueryHandler<GetMercanciaPeligrosaByRemesaCommand>
{
  constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  async execute(command: GetMercanciaPeligrosaByRemesaCommand) {
    try {
      const data =
        await this.mercanciaRepository.getByRemesa(command.fk_remesa);

      if (!data || data.length === 0) {
        return ResponseUtil.error('Mercancía no encontrada', 404);
      }

      return ResponseUtil.success(
        data,
        'Mercancía peligrosa obtenida exitosamente',
      );
    } catch (error) {
      console.error(
        'Error en GetMercanciaPeligrosaByRemesaHandler:',
        error,
      );
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message ||
        'Error al obtener la mercancía peligrosa';
      return ResponseUtil.error(message, status);
    }
  }
}
