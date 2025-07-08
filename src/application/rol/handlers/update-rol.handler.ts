import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRolCommand } from '../commands/update-rol.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateRolCommand)
@Injectable()
export class UpdateRolHandler implements ICommandHandler<UpdateRolCommand> {
  constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  async execute(command: UpdateRolCommand) {
    try {
      const result = await this.rolRepository.updateRol(command.id, command.nombre_rol);
      if (!result?.rowCount) {
        return ResponseUtil.error('Rol no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Rol actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateRolHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el rol';
      return ResponseUtil.error(message, status);
    }
  }
}
