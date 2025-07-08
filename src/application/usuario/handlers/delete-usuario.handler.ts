// delete-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUsuarioCommand } from '../commands/delete-usuario.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteUsuarioCommand)
@Injectable()
export class DeleteUsuarioHandler implements ICommandHandler<DeleteUsuarioCommand> {
  constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) {}

  async execute(command: DeleteUsuarioCommand) {
    try {
      const result = await this.usuarioRepository.deleteUsuario(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Usuario no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Usuario eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteUsuarioHandler:', error);
      return ResponseUtil.error('Error al eliminar el usuario', 500);
    }
  }
}
