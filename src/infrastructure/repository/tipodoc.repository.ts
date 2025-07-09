import { Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../domain/tipodoc-domain/tipodoc.interface';
import { Tipodoc } from '../../domain/tipodoc-domain/tipodoc.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class TipodocRepository implements TipodocInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Tipodoc[]> {
    const query = this.postgresService.getQuery('get-all-tipodocs');
    const result = await this.postgresService.query<Tipodoc>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Tipodoc | null> {
    const query = this.postgresService.getQuery('get-tipodoc');
    const result = await this.postgresService.query<Tipodoc>(query, [id]);
    return result.rows[0] || null;
  }

  async createTipodoc(nombre_documento: string, abreviatura: string): Promise<Tipodoc> {
    const query = this.postgresService.getQuery('insert-tipodoc');
    const params = [nombre_documento, abreviatura];
    const result = await this.postgresService.query<Tipodoc>(query, params);
    return result.rows[0];
  }

  async updateTipodoc(id: number, nombre_documento: string, abreviatura: string): Promise<any> {
    const query = this.postgresService.getQuery('update-tipodoc');
    const params = [nombre_documento, abreviatura, id];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteTipodoc(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-tipodoc');
    return this.postgresService.query<any[]>(query, [id]);
  }
}
