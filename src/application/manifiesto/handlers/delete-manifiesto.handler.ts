// delete-manifiesto.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteManifiestoCommand } from '../commands/delete-manifiesto.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteManifiestoCommand)
@Injectable()
export class DeleteManifiestoHandler implements ICommandHandler<DeleteManifiestoCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(command: DeleteManifiestoCommand) {
    try {
      const result = await this.manifiestoRepository.deleteManifiesto(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Manifiesto no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Manifiesto eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteManifiestoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el manifiesto';
      return ResponseUtil.error(message, status);
    }
  }
}
