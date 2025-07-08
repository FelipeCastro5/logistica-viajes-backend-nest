import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGastoCommand } from '../commands/update-gasto.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateGastoCommand)
@Injectable()
export class UpdateGastoHandler implements ICommandHandler<UpdateGastoCommand> {
  constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  async execute(command: UpdateGastoCommand) {
    try {
      const result = await this.gastoRepository.updateGasto(command.id, command.nombre_gasto);
      if (!result?.rowCount) {
        return ResponseUtil.error('Gasto no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Gasto actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateGastoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el gasto';
      return ResponseUtil.error(message, status);
    }
  }
}
