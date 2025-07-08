import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllClientesCommand } from '../commands/get-all-clientes.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllClientesCommand)
@Injectable()
export class GetAllClientesHandler implements IQueryHandler<GetAllClientesCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const clientes = await this.clienteRepository.getAll();
      return ResponseUtil.success(clientes, 'Clientes obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllClientesHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los clientes';
      return ResponseUtil.error(message, status);
    }
  }
}
