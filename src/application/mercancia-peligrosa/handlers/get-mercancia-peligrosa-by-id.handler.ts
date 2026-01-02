import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetMercanciaPeligrosaByIdCommand } from '../commands/get-mercancia-peligrosa-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetMercanciaPeligrosaByIdCommand)
@Injectable()
export class GetMercanciaPeligrosaByIdHandler
  implements IQueryHandler<GetMercanciaPeligrosaByIdCommand>
{
  constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  async execute(command: GetMercanciaPeligrosaByIdCommand) {
    try {
      const mercancia =
        await this.mercanciaRepository.getById(command.id);

      if (!mercancia) {
        return ResponseUtil.error('Mercancía no encontrada', 404);
      }

      return ResponseUtil.success(
        mercancia,
        'Mercancía peligrosa encontrada exitosamente',
      );
    } catch (error) {
      console.error('Error en GetMercanciaPeligrosaByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message ||
        'Error al obtener la mercancía peligrosa';
      return ResponseUtil.error(message, status);
    }
  }
}
