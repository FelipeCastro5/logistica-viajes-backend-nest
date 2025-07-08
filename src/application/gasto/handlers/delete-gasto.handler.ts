import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGastoCommand } from '../commands/delete-gasto.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteGastoCommand)
@Injectable()
export class DeleteGastoHandler implements ICommandHandler<DeleteGastoCommand> {
  constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  async execute(command: DeleteGastoCommand) {
    try {
      const result = await this.gastoRepository.deleteGasto(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Gasto no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Gasto eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteGastoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el gasto';
      return ResponseUtil.error(message, status);
    }
  }
}
