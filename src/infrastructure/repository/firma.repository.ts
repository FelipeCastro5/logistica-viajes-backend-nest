import { Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../domain/firma-domain/firma.interface';
import { Firma } from '../../domain/firma-domain/firma.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class FirmaRepository implements FirmaInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Firma[]> {
    const query = this.postgresService.getQuery('get-all-firmas');
    const result = await this.postgresService.query<Firma>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Firma | null> {
    const query = this.postgresService.getQuery('get-firma-by-id');
    const result = await this.postgresService.query<Firma>(query, [id]);
    return result.rows[0] || null;
  }

  async createFirma(
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<Firma> {
    const query = this.postgresService.getQuery('insert-firma');
    const params = [fk_viaje, tipo_firma, firma_digital];
    const result = await this.postgresService.query<Firma>(query, params);
    return result.rows[0];
  }

  async updateFirma(
    id: number,
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-firma');
    const params = [fk_viaje, tipo_firma, firma_digital, id];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteFirma(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-firma');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getFirmasByViaje(fk_viaje: number): Promise<Firma[]> {
    const query = this.postgresService.getQuery('get-firmas-by-viaje');
    const result = await this.postgresService.query<Firma>(query, [fk_viaje]);
    return result.rows || null;
  }
}
