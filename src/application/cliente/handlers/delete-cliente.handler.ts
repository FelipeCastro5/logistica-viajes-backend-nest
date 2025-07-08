import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClienteCommand } from '../commands/delete-cliente.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteClienteCommand)
@Injectable()
export class DeleteClienteHandler implements ICommandHandler<DeleteClienteCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(command: DeleteClienteCommand) {
    try {
      const result = await this.clienteRepository.deleteCliente(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Cliente no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Cliente eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteClienteHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el cliente';
      return ResponseUtil.error(message, status);
    }
  }
}
