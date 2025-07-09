import { Injectable } from '@nestjs/common';
import { ChatInterface } from '../../domain/chat-domain/chat.interface';
import { Chat } from '../../domain/chat-domain/chat.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class ChatRepository implements ChatInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Chat[]> {
    const query = this.postgresService.getQuery('get-all-chats');
    const result = await this.postgresService.query<Chat>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Chat | null> {
    const query = this.postgresService.getQuery('get-chat');
    const result = await this.postgresService.query<Chat>(query, [id]);
    return result.rows[0] || null;
  }

  async createChat(fk_usuario: number, nombre_chat: string): Promise<Chat> {
    const query = this.postgresService.getQuery('insert-chat');
    const result = await this.postgresService.query<Chat>(query, [fk_usuario, nombre_chat]);
    return result.rows[0];
  }

  async updateChat(id: number, fk_usuario: number, nombre_chat: string): Promise<any> {
    const query = this.postgresService.getQuery('update-chat');
    const result = await this.postgresService.query<any[]>(query, [fk_usuario, nombre_chat, id]);
    return result;
  }

  async deleteChat(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-chat');
    const result = await this.postgresService.query<any[]>(query, [id]);
    return result;
  }
}
