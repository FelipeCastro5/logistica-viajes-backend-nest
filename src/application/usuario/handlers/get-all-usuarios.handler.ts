// get-all-usuarios.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllUsuariosCommand } from '../commands/get-all-usuarios.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllUsuariosCommand)
@Injectable()
export class GetAllUsuariosHandler implements IQueryHandler<GetAllUsuariosCommand> {
  constructor(
    @Inject('UsuarioInterface')
    private readonly usuarioRepository: UsuarioInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const usuarios = await this.usuarioRepository.getAll();
      return ResponseUtil.success(usuarios, 'Usuarios obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllUsuariosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los usuarios';
      return ResponseUtil.error(message, status);
    }
  }
}
