import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatRepository } from '../../infrastructure/repository/chat.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { ChatController } from '../controllers/chat.controller';

import { CreateChatHandler } from '../../application/chat/handlers/create-chat.handler';
import { UpdateChatHandler } from '../../application/chat/handlers/update-chat.handler';
import { DeleteChatHandler } from '../../application/chat/handlers/delete-chat.handler';
import { GetAllChatsHandler } from '../../application/chat/handlers/get-all-chats.handler';
import { GetChatByIdHandler } from '../../application/chat/handlers/get-chat-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'ChatInterface',
      useClass: ChatRepository,
    },
    CreateChatHandler,
    UpdateChatHandler,
    DeleteChatHandler,
    GetAllChatsHandler,
    GetChatByIdHandler,
  ],
  controllers: [ChatController],
  exports: ['ChatInterface'],
})
export class ChatModule {}
