// get-usuario-by-id.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUsuarioByIdCommand } from '../commands/get-usuario-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetUsuarioByIdCommand)
@Injectable()
export class GetUsuarioByIdHandler implements IQueryHandler<GetUsuarioByIdCommand> {
  constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) {}

  async execute(command: GetUsuarioByIdCommand) {
    try {
      const usuario = await this.usuarioRepository.getById(command.id);
      if (!usuario) {
        return ResponseUtil.error('Usuario no encontrado', 404);
      }
      return ResponseUtil.success(usuario, 'Usuario encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetUsuarioByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el usuario';
      return ResponseUtil.error(message, status);
    }
  }
}
