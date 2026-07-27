import { Injectable } from '@nestjs/common';
import { ChatInterface } from '../../domain/chat-domain/chat.interface';
import { Chat } from '../../domain/chat-domain/chat.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Chat.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class ChatRepository implements ChatInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Chat[]> {
        const query = this.postgresService.getQuery('get-all-chats');
        const result = await this.postgresService.query<Chat>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Chat | null> {
        const query = this.postgresService.getQuery('get-chat');
        const result = await this.postgresService.query<Chat>(query, [id]);
        return result.rows || null;
    }

  /**
     * Ejecuta la operación técnica de createChat.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param nombre_chat Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createChat(fk_usuario: number, nombre_chat: string): Promise<Chat> {
        const query = this.postgresService.getQuery('insert-chat');
        const result = await this.postgresService.query<Chat>(query, [fk_usuario, nombre_chat]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateChat.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param nombre_chat Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateChat(id: number, fk_usuario: number, nombre_chat: string): Promise<any> {
        const query = this.postgresService.getQuery('update-chat');
        const result = await this.postgresService.query<any[]>(query, [fk_usuario, nombre_chat, id]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result;
    }

  /**
     * Ejecuta la operación técnica de deleteChat.
     * @param id_chat Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteChat(id_chat: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-chat');
        const result = await this.postgresService.query<any[]>(query, [id_chat]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result;
    }
}
