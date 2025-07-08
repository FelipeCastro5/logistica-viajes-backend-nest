import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClienteCommand } from '../commands/update-cliente.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../../domain/cliente-domain/cliente.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateClienteCommand)
@Injectable()
export class UpdateClienteHandler implements ICommandHandler<UpdateClienteCommand> {
  constructor(
    @Inject('ClienteInterface')
    private readonly clienteRepository: ClienteInterface,
  ) {}

  async execute(command: UpdateClienteCommand) {
    try {
      const result = await this.clienteRepository.updateCliente(
        command.id,
        command.fk_usuario,
        command.nit,
        command.nombre_cliente,
        command.telefono,
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Cliente no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Cliente actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateClienteHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el cliente';
      return ResponseUtil.error(message, status);
    }
  }
}
