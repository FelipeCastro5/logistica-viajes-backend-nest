// create-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsuarioCommand } from '../commands/create-usuario.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateUsuarioCommand)
@Injectable()
export class CreateUsuarioHandler implements ICommandHandler<CreateUsuarioCommand> {
  constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) { }

  async execute(command: CreateUsuarioCommand) {
    try {
      const usuario = await this.usuarioRepository.createUsuario(
        command.fk_tipodoc,
        command.num_doc,
        command.fk_rol,
        command.fk_contador,
        command.p_nombre,
        command.s_nombre,
        command.p_apellido,
        command.s_apellido,
        command.telefono,
        command.correo,
        command.contrasena
      );
      return ResponseUtil.success(usuario, 'Usuario creado exitosamente', 201);
    } catch (error) {
      // Si es HttpException, extrae su status
      console.error('Error en CreateUsuarioHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el usuario';
      return ResponseUtil.error(message, status);
    }
  }
}
