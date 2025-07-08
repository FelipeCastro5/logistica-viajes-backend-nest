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
  ) {}

  async execute(command: CreateUsuarioCommand) {
    try {
      const usuario = await this.usuarioRepository.createUsuario({ ...command });
      return ResponseUtil.success(usuario, 'Usuario creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateUsuarioHandler:', error);
      return ResponseUtil.error('Error al crear el usuario', 500);
    }
  }
}
