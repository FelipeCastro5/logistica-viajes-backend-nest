import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGastoXViajeCommand } from '../commands/update-gastoxviaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateGastoXViajeCommand)
@Injectable()
export class UpdateGastoxviajeHandler implements ICommandHandler<UpdateGastoXViajeCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(command: UpdateGastoXViajeCommand) {
    try {
      const result = await this.repository.updateGastoxviaje(
        command.id,
        command.fk_viaje,
        command.fk_gasto,
        command.valor,
        command.detalles
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Gasto por viaje actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateGastoXViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el gasto por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
