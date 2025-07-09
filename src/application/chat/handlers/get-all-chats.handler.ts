import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllChatsCommand } from '../commands/get-all-chats.command';
import { Inject, Injectable } from '@nestjs/common';
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllChatsCommand)
@Injectable()
export class GetAllChatsHandler implements IQueryHandler<GetAllChatsCommand> {
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const chats = await this.chatRepository.getAll();
      return ResponseUtil.success(chats, 'Chats obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllChatsHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los chats';
      return ResponseUtil.error(message, status);
    }
  }
}
