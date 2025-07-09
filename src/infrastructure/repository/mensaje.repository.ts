import { Injectable } from '@nestjs/common';
import { MensajeInterface } from '../../domain/mensaje-domain/mensaje.interface';
import { Mensaje } from '../../domain/mensaje-domain/mensaje.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class MensajeRepository implements MensajeInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Mensaje[]> {
    const query = this.postgresService.getQuery('get-all-mensajes');
    const result = await this.postgresService.query<Mensaje>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Mensaje | null> {
    const query = this.postgresService.getQuery('get-mensaje');
    const result = await this.postgresService.query<Mensaje>(query, [id]);
    return result.rows[0] || null;
  }

  async createMensaje(fk_chat: number, pregunta: string, respuesta: string): Promise<Mensaje> {
    const query = this.postgresService.getQuery('insert-mensaje');
    const result = await this.postgresService.query<Mensaje>(query, [fk_chat, pregunta, respuesta]);
    return result.rows[0];
  }

  async updateMensaje(id: number, fk_chat: number, pregunta: string, respuesta: string): Promise<any> {
    const query = this.postgresService.getQuery('update-mensaje');
    return this.postgresService.query<any[]>(query, [fk_chat, pregunta, respuesta, id]);
  }

  async deleteMensaje(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-mensaje');
    return this.postgresService.query<any[]>(query, [id]);
  }
}
