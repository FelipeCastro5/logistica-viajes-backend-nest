import { Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../domain/tipodoc-domain/tipodoc.interface';
import { Tipodoc } from '../../domain/tipodoc-domain/tipodoc.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Tipodoc.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class TipodocRepository implements TipodocInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Tipodoc[]> {
        const query = this.postgresService.getQuery('get-all-tipodocs');
        const result = await this.postgresService.query<Tipodoc>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Tipodoc | null> {
        const query = this.postgresService.getQuery('get-tipodoc');
        const result = await this.postgresService.query<Tipodoc>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createTipodoc.
     * @param nombre_documento Parámetro de entrada de tipo string.
     * @param abreviatura Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createTipodoc(nombre_documento: string, abreviatura: string): Promise<Tipodoc> {
        const query = this.postgresService.getQuery('insert-tipodoc');
        const params = [nombre_documento, abreviatura];
        const result = await this.postgresService.query<Tipodoc>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateTipodoc.
     * @param id Parámetro de entrada de tipo number.
     * @param nombre_documento Parámetro de entrada de tipo string.
     * @param abreviatura Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateTipodoc(id: number, nombre_documento: string, abreviatura: string): Promise<any> {
        const query = this.postgresService.getQuery('update-tipodoc');
        const params = [nombre_documento, abreviatura, id];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteTipodoc.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteTipodoc(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-tipodoc');
        return this.postgresService.query<any[]>(query, [id]);
    }
}
