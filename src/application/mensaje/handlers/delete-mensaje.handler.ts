import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMensajeCommand } from '../commands/delete-mensaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteMensajeCommand)
@Injectable()
export class DeleteMensajeHandler implements ICommandHandler<DeleteMensajeCommand> {
  constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  async execute(command: DeleteMensajeCommand) {
    try {
      const result = await this.mensajeRepository.deleteMensaje(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Mensaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Mensaje eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteMensajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el mensaje';
      return ResponseUtil.error(message, status);
    }
  }
}
