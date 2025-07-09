import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetChatByIdCommand } from '../commands/get-chat-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetChatByIdCommand)
@Injectable()
export class GetChatByIdHandler implements IQueryHandler<GetChatByIdCommand> {
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  async execute(command: GetChatByIdCommand) {
    try {
      const chat = await this.chatRepository.getById(command.id);
      if (!chat) {
        return ResponseUtil.error('Chat no encontrado', 404);
      }
      return ResponseUtil.success(chat, 'Chat encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetChatByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el chat';
      return ResponseUtil.error(message, status);
    }
  }
}
