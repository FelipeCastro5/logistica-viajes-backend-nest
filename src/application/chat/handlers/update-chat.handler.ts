import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateChatCommand } from '../commands/update-chat.command';
import { Inject, Injectable } from '@nestjs/common';
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateChatCommand)
@Injectable()
export class UpdateChatHandler implements ICommandHandler<UpdateChatCommand> {
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  async execute(command: UpdateChatCommand) {
    try {
      const result = await this.chatRepository.updateChat(
        command.id,
        command.fk_usuario,
        command.nombre_chat
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Chat actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateChatHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el chat';
      return ResponseUtil.error(message, status);
    }
  }
}
