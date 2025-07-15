import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres-db/postgres.service';
import { GastoxviajeInterface } from '../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { Gastoxviaje } from '../../domain/gastoxviaje-domain/gastoxviaje.entity';

@Injectable()
export class GastoxviajeRepository implements GastoxviajeInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Gastoxviaje[]> {
    const query = this.postgresService.getQuery('get-all-gastosxviaje');
    const result = await this.postgresService.query<Gastoxviaje>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Gastoxviaje | null> {
    const query = this.postgresService.getQuery('get-gastoxviaje');
    const result = await this.postgresService.query<Gastoxviaje>(query, [id]);
    return result.rows[0] || null;
  }

  async createGastoxviaje(
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<Gastoxviaje> {
    const query = this.postgresService.getQuery('insert-gastoxviaje');
    const params = [fk_viaje, fk_gasto, valor, detalles];
    const result = await this.postgresService.query<Gastoxviaje>(query, params);
    return result.rows[0];
  }

  async updateGastoxviaje(
    id: number,
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-gastoxviaje');
    const params = [fk_viaje, fk_gasto, valor, detalles, id];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteGastoxviaje(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-gastoxviaje');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getGastosByViaje(fk: number): Promise<any | null> {
    const query = this.postgresService.getQuery('get-gastos-by-viaje');
    const result = await this.postgresService.query<any>(query, [fk]);
    return result.rows;
  }
}
