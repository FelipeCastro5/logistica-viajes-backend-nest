import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRemesaCommand } from '../commands/delete-remesa.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteRemesaCommand)
@Injectable()
export class DeleteRemesaHandler
  implements ICommandHandler<DeleteRemesaCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute(command: DeleteRemesaCommand) {
    try {
      const result = await this.remesaRepository.deleteRemesa(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Remesa no encontrada', 404);
      }
      return ResponseUtil.success(null, 'Remesa eliminada exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteRemesaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar la remesa';
      return ResponseUtil.error(message, status);
    }
  }
}
