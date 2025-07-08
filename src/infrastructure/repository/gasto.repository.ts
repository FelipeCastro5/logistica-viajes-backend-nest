import { Injectable } from '@nestjs/common';
import { GastoInterface } from '../../domain/gasto-domain/gasto.interface';
import { Gasto } from '../../domain/gasto-domain/gasto.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class GastoRepository implements GastoInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Gasto[]> {
    const query = this.postgresService.getQuery('get-all-gastos');
    const result = await this.postgresService.query<Gasto>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Gasto | null> {
    const query = this.postgresService.getQuery('get-gasto');
    const result = await this.postgresService.query<Gasto>(query, [id]);
    return result.rows[0] || null;
  }

  async createGasto(nombre_gasto: string): Promise<Gasto> {
    const query = this.postgresService.getQuery('insert-gasto');
    const result = await this.postgresService.query<Gasto>(query, [nombre_gasto]);
    return result.rows[0];
  }

  async updateGasto(id: number, nombre_gasto: string): Promise<any> {
    const query = this.postgresService.getQuery('update-gasto');
    return this.postgresService.query<any[]>(query, [nombre_gasto, id]);
  }

  async deleteGasto(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-gasto');
    return this.postgresService.query<any[]>(query, [id]);
  }
}
