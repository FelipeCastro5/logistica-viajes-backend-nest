import { Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../domain/seguro-domain/seguro.interface';
import { Seguro } from '../../domain/seguro-domain/seguro.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class SeguroRepository implements SeguroInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Seguro[]> {
    const query = this.postgresService.getQuery('get-all-seguros');
    const result = await this.postgresService.query<Seguro>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Seguro | null> {
    const query = this.postgresService.getQuery('get-seguro');
    const result = await this.postgresService.query<Seguro>(query, [id]);
    return result.rows[0] || null;
  }

  async createSeguro(
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<Seguro> {
    const query = this.postgresService.getQuery('insert-seguro');
    const params = [
      fk_vehiculo,
      tipo_seguro,
      numero_poliza,
      aseguradora,
      fecha_vencimiento,
      valor,
    ];
    const result = await this.postgresService.query<Seguro>(query, params);
    return result.rows[0];
  }

  async updateSeguro(
    id: number,
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-seguro');
    const params = [
      fk_vehiculo,
      tipo_seguro,
      numero_poliza,
      aseguradora,
      fecha_vencimiento,
      valor,
      id,
    ];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteSeguro(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-seguro');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getSegurosByVehiculo(fk_vehiculo: number): Promise<Seguro[]> {
    const query = this.postgresService.getQuery('get-seguro-by-vehiculo');
    const result = await this.postgresService.query<Seguro>(query, [fk_vehiculo]);
    return result.rows || [];
  }
}
