import { Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../domain/firma-domain/firma.interface';
import { Firma } from '../../domain/firma-domain/firma.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Firma.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class FirmaRepository implements FirmaInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Firma[]> {
        const query = this.postgresService.getQuery('get-all-firmas');
        const result = await this.postgresService.query<Firma>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Firma | null> {
        const query = this.postgresService.getQuery('get-firma-by-id');
        const result = await this.postgresService.query<Firma>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createFirma.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param tipo_firma Parámetro de entrada de tipo string.
     * @param firma_digital Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de updateFirma.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param tipo_firma Parámetro de entrada de tipo string.
     * @param firma_digital Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de deleteFirma.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteFirma(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-firma');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getFirmasByViaje.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getFirmasByViaje(fk_viaje: number): Promise<Firma[]> {
        const query = this.postgresService.getQuery('get-firmas-by-viaje');
        const result = await this.postgresService.query<Firma>(query, [fk_viaje]);
        return result.rows || null;
    }
}
