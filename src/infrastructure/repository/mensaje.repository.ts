import { Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../domain/mensaje-domain/mensaje.interface';
import { Mensaje } from '../../domain/mensaje-domain/mensaje.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Mensaje.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class MensajeRepository implements MensajeInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Mensaje[]> {
        const query = this.postgresService.getQuery('get-all-mensajes');
        const result = await this.postgresService.query<Mensaje>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Mensaje | null> {
        const query = this.postgresService.getQuery('get-mensaje');
        const result = await this.postgresService.query<Mensaje>(query, [id]);
        return result.rows || null;
    }

  /**
     * Ejecuta la operación técnica de createMensaje.
     * @param fk_chat Parámetro de entrada de tipo number.
     * @param pregunta Parámetro de entrada de tipo string.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createMensaje(fk_chat: number, pregunta: string, respuesta: string): Promise<Mensaje> {
        const query = this.postgresService.getQuery('insert-mensaje');
        const result = await this.postgresService.query<Mensaje>(query, [fk_chat, pregunta, respuesta]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateMensaje.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_chat Parámetro de entrada de tipo number.
     * @param pregunta Parámetro de entrada de tipo string.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateMensaje(id: number, fk_chat: number, pregunta: string, respuesta: string): Promise<any> {
        const query = this.postgresService.getQuery('update-mensaje');
        return this.postgresService.query<any[]>(query, [fk_chat, pregunta, respuesta, id]);
    }

  /**
     * Ejecuta la operación técnica de deleteMensaje.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteMensaje(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-mensaje');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getLastFive.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getLastFive(): Promise<Mensaje[]> {
        const query = this.postgresService.getQuery('get-last-five-mensajes');
        const result = await this.postgresService.query<Mensaje>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getLastFiveByChat.
     * @param fk_chat Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getLastFiveByChat(fk_chat: number): Promise<Mensaje[]> {
        const query = this.postgresService.getQuery('get-last-five-mensajes-by-chat');
        const result = await this.postgresService.query<Mensaje>(query, [fk_chat]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

}
