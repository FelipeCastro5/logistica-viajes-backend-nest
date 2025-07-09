import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTipodocCommand } from '../commands/delete-tipodoc.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteTipodocCommand)
@Injectable()
export class DeleteTipodocHandler implements ICommandHandler<DeleteTipodocCommand> {
  constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  async execute(command: DeleteTipodocCommand) {
    try {
      const result = await this.tipodocRepository.deleteTipodoc(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Tipo de documento no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Tipo de documento eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteTipodocHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el tipo de documento';
      return ResponseUtil.error(message, status);
    }
  }
}
