import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLugarCommand } from '../commands/delete-lugar.command';
import { Inject, Injectable } from '@nestjs/common';
import { LugarInterface } from '../../../domain/lugar-domain/lugar.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteLugarCommand)
@Injectable()
export class DeleteLugarHandler implements ICommandHandler<DeleteLugarCommand> {
  constructor(
    @Inject('LugarInterface')
    private readonly lugarRepository: LugarInterface,
  ) {}

  async execute(command: DeleteLugarCommand) {
    try {
      const result = await this.lugarRepository.deleteLugar(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Lugar no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Lugar eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteLugarHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el lugar';
      return ResponseUtil.error(message, status);
    }
  }
}
