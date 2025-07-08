import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteViajeCommand } from '../commands/delete-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteViajeCommand)
@Injectable()
export class DeleteViajeHandler implements ICommandHandler<DeleteViajeCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(command: DeleteViajeCommand) {
    try {
      const result = await this.viajeRepository.deleteViaje(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Viaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Viaje eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
