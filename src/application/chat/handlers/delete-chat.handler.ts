import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteChatCommand } from '../commands/delete-chat.command';
import { Inject, Injectable } from '@nestjs/common';
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteChatCommand)
@Injectable()
export class DeleteChatHandler implements ICommandHandler<DeleteChatCommand> {
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  async execute(command: DeleteChatCommand) {
    try {
      const result = await this.chatRepository.deleteChat(command.id);
      if (!result?.rowCount) {
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Chat eliminado exitosamente', 200);
    } catch (error) {
      console.error('Error en DeleteChatHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al eliminar el chat';
      return ResponseUtil.error(message, status);
    }
  }
}
