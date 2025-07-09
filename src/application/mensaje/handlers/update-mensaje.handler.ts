import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMensajeCommand } from '../commands/update-mensaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateMensajeCommand)
@Injectable()
export class UpdateMensajeHandler implements ICommandHandler<UpdateMensajeCommand> {
  constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  async execute(command: UpdateMensajeCommand) {
    try {
      const result = await this.mensajeRepository.updateMensaje(
        command.id,
        command.fk_chat,
        command.pregunta,
        command.respuesta
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Mensaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Mensaje actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateMensajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el mensaje';
      return ResponseUtil.error(message, status);
    }
  }
}
