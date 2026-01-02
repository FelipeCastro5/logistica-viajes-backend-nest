import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMercanciaPeligrosaCommand } from '../commands/delete-mercancia-peligrosa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteMercanciaPeligrosaCommand)
@Injectable()
export class DeleteMercanciaPeligrosaHandler
  implements ICommandHandler<DeleteMercanciaPeligrosaCommand>
{
  constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  async execute(command: DeleteMercanciaPeligrosaCommand) {
    try {
      const result =
        await this.mercanciaRepository.deleteMercanciaPeligrosa(command.id);

      if (!result?.rowCount) {
        return ResponseUtil.error('Mercancía no encontrada', 404);
      }

      return ResponseUtil.success(
        null,
        'Mercancía peligrosa eliminada exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en DeleteMercanciaPeligrosaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message ||
        'Error al eliminar la mercancía peligrosa';
      return ResponseUtil.error(message, status);
    }
  }
}
