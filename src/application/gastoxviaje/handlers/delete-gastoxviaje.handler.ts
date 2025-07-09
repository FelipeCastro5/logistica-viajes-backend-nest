import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGastoXViajeCommand } from '../commands/delete-gastoxviaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteGastoXViajeCommand)
@Injectable()
export class DeleteGastoxviajeHandler implements ICommandHandler<DeleteGastoXViajeCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(command: DeleteGastoXViajeCommand) {
    try {
      const result = await this.repository.deleteGastoxviaje(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Gasto por viaje eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteGastoXViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el gasto por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
