import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMensajeCommand } from '../commands/create-mensaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../../domain/mensaje-domain/mensaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateMensajeCommand)
@Injectable()
export class CreateMensajeHandler implements ICommandHandler<CreateMensajeCommand> {
  constructor(
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) {}

  async execute(command: CreateMensajeCommand) {
    try {
      const mensaje = await this.mensajeRepository.createMensaje(
        command.fk_chat,
        command.pregunta,
        command.respuesta
      );
      return ResponseUtil.success(mensaje, 'Mensaje creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateMensajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el mensaje';
      return ResponseUtil.error(message, status);
    }
  }
}
