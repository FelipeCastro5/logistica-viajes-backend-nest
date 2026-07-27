import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres-db/postgres.service';
import { GastoxviajeInterface } from '../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { Gastoxviaje } from '../../domain/gastoxviaje-domain/gastoxviaje.entity';

/**
 * Implementación concreta del repositorio para Gastoxviaje.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class GastoxviajeRepository implements GastoxviajeInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Gastoxviaje[]> {
        const query = this.postgresService.getQuery('get-all-gastosxviaje');
        const result = await this.postgresService.query<Gastoxviaje>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Gastoxviaje | null> {
        const query = this.postgresService.getQuery('get-gastoxviaje');
        const result = await this.postgresService.query<Gastoxviaje>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createGastoxviaje.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param fk_gasto Parámetro de entrada de tipo number.
     * @param valor Parámetro de entrada de tipo number.
     * @param detalles Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de updateGastoxviaje.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param fk_gasto Parámetro de entrada de tipo number.
     * @param valor Parámetro de entrada de tipo number.
     * @param detalles Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de deleteGastoxviaje.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteGastoxviaje(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-gastoxviaje');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getGastosByViaje.
     * @param fk Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getGastosByViaje(fk: number): Promise<any | null> {
        const query = this.postgresService.getQuery('get-gastos-by-viaje');
        const result = await this.postgresService.query<any>(query, [fk]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de updateGastoxviajeFactura.
     * @param id Parámetro de entrada de tipo number.
     * @param urlFactura Parámetro de entrada de tipo string.
     * @param idFactura Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateGastoxviajeFactura(id: number, urlFactura: string, idFactura: string): Promise<any> {
        const query = this.postgresService.getQuery('update-gastoxviaje-factura');
        const params = [urlFactura, idFactura, id];
        console.log('[gastoxviaje-repository] updateGastoxviajeFactura', {
          id,
          urlFactura,
          idFactura,
          queryName: 'update-gastoxviaje-factura',
          params,
        });

        try {
          const result = await this.postgresService.query<any>(query, params);
          console.log('[gastoxviaje-repository] factura actualizada', {
            id,
            rowCount: result.rowCount,
            returnedRow: result.rows[0],
          });
          return result.rows[0];
        } // Manejo de errores a nivel de base de datos.
         catch (error) {
          console.error('[gastoxviaje-repository] error actualizando factura', {
            id,
            urlFactura,
            idFactura,
            params,
            error,
          });
          throw error;
        }
    }

  /**
     * Ejecuta la operación técnica de clearGastoxviajeFactura.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async clearGastoxviajeFactura(id: number): Promise<any> {
        const query = this.postgresService.getQuery('clear-gastoxviaje-factura');
        const result = await this.postgresService.query<any>(query, [id]);
        return result.rows[0];
    }
}
