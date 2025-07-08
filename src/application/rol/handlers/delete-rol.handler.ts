import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRolCommand } from '../commands/delete-rol.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteRolCommand)
@Injectable()
export class DeleteRolHandler implements ICommandHandler<DeleteRolCommand> {
  constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  async execute(command: DeleteRolCommand) {
    try {
      const result = await this.rolRepository.deleteRol(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Rol no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Rol eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteRolHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el rol';
      return ResponseUtil.error(message, status);
    }
  }
}
