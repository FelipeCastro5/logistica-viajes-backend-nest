import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetClientesByUsuarioCommand } from '../commands/get-clientes-by-usuario.command';

@QueryHandler(GetClientesByUsuarioCommand)
@Injectable()
export class GetClientesByUsuarioHandler implements IQueryHandler<GetClientesByUsuarioCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(command: GetClientesByUsuarioCommand) {
    try {
      const cliente = await this.clienteRepository.getClientesByUsuario(command.fk_usuario);
      if (!cliente) {
        return ResponseUtil.error('Clientes no encontrados', 404);
      }
      return ResponseUtil.success(cliente, 'Clientes encontrados exitosamente');
    } catch (error) {
      console.error('Error en GetClientesByUsuarioHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los cliente';
      return ResponseUtil.error(message, status);
    }
  }
}
