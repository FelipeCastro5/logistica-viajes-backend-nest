import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClienteCommand } from '../commands/create-cliente.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateClienteCommand)
@Injectable()
export class CreateClienteHandler implements ICommandHandler<CreateClienteCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(command: CreateClienteCommand) {
    try {
      const cliente = await this.clienteRepository.createCliente(
        command.fk_usuario,
        command.nit,
        command.nombre_cliente,
        command.telefono,
      );
      return ResponseUtil.success(cliente, 'Cliente creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateClienteHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el cliente';
      return ResponseUtil.error(message, status);
    }
  }
}
