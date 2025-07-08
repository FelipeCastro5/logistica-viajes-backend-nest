import { Injectable } from '@nestjs/common';
import { LugarInterface } from '../../domain/lugar-domain/lugar.interface';
import { Lugar } from '../../domain/lugar-domain/lugar.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class LugarRepository implements LugarInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Lugar[]> {
    const query = this.postgresService.getQuery('get-all-lugares');
    const result = await this.postgresService.query<Lugar>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Lugar | null> {
    const query = this.postgresService.getQuery('get-lugar');
    const result = await this.postgresService.query<Lugar>(query, [id]);
    return result.rows[0] || null;
  }

  async createLugar(nombre_lugar: string): Promise<Lugar> {
    const query = this.postgresService.getQuery('insert-lugar');
    const result = await this.postgresService.query<Lugar>(query, [nombre_lugar]);
    return result.rows[0];
  }

  async updateLugar(id: number, nombre_lugar: string): Promise<Lugar> {
    const query = this.postgresService.getQuery('update-lugar');
    const result = await this.postgresService.query<Lugar>(query, [nombre_lugar, id]);
    return result.rows[0];
  }

  async deleteLugar(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-lugar');
    return this.postgresService.query<any[]>(query, [id]);
  }
}
