import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateChatCommand } from '../commands/create-chat.command';
import { Inject, Injectable } from '@nestjs/common';
import { ChatInterface } from '../../../domain/chat-domain/chat.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateChatCommand)
@Injectable()
export class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
  constructor(
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
  ) {}

  async execute(command: CreateChatCommand) {
    try {
      const chat = await this.chatRepository.createChat(
        command.fk_usuario,
        command.nombre_chat
      );
      return ResponseUtil.success(chat, 'Chat creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateChatHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el chat';
      return ResponseUtil.error(message, status);
    }
  }
}
