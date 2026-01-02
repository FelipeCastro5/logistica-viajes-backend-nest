import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSeguroCommand } from '../commands/delete-seguro.command';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteSeguroCommand)
@Injectable()
export class DeleteSeguroHandler
  implements ICommandHandler<DeleteSeguroCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute(command: DeleteSeguroCommand) {
    try {
      const result = await this.seguroRepository.deleteSeguro(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Seguro no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Seguro eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteSeguroHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el seguro';
      return ResponseUtil.error(message, status);
    }
  }
}
