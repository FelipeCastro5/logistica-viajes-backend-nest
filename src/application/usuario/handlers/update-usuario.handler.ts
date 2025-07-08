// update-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUsuarioCommand } from '../commands/update-usuario.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateUsuarioCommand)
@Injectable()
export class UpdateUsuarioHandler implements ICommandHandler<UpdateUsuarioCommand> {
  constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) {}

  async execute(command: UpdateUsuarioCommand) {
    try {
      const result = await this.usuarioRepository.updateUsuario(command.id, { ...command });
      if (!result?.rowCount) {
        return ResponseUtil.error('Usuario no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Usuario actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateUsuarioHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el usuario';
      return ResponseUtil.error(message, status);
    }
  }
}
