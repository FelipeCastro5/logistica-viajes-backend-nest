import { Injectable } from '@nestjs/common';
import { GastoInterface } from '../../domain/gasto-domain/gasto.interface';
import { Gasto } from '../../domain/gasto-domain/gasto.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Gasto.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class GastoRepository implements GastoInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Gasto[]> {
        const query = this.postgresService.getQuery('get-all-gastos');
        const result = await this.postgresService.query<Gasto>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Gasto | null> {
        const query = this.postgresService.getQuery('get-gasto');
        const result = await this.postgresService.query<Gasto>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createGasto.
     * @param nombre_gasto Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createGasto(nombre_gasto: string): Promise<Gasto> {
        const query = this.postgresService.getQuery('insert-gasto');
        const result = await this.postgresService.query<Gasto>(query, [nombre_gasto]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateGasto.
     * @param id Parámetro de entrada de tipo number.
     * @param nombre_gasto Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateGasto(id: number, nombre_gasto: string): Promise<any> {
        const query = this.postgresService.getQuery('update-gasto');
        return this.postgresService.query<any[]>(query, [nombre_gasto, id]);
    }

  /**
     * Ejecuta la operación técnica de deleteGasto.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteGasto(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-gasto');
        return this.postgresService.query<any[]>(query, [id]);
    }
}
