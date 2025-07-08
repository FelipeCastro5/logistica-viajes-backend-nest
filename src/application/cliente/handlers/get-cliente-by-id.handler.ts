import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetClienteByIdCommand } from '../commands/get-cliente-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetClienteByIdCommand)
@Injectable()
export class GetClienteByIdHandler implements IQueryHandler<GetClienteByIdCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(command: GetClienteByIdCommand) {
    try {
      const cliente = await this.clienteRepository.getById(command.id);
      if (!cliente) {
        return ResponseUtil.error('Cliente no encontrado', 404);
      }
      return ResponseUtil.success(cliente, 'Cliente encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetClienteByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el cliente';
      return ResponseUtil.error(message, status);
    }
  }
}
