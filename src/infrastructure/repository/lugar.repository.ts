import { Injectable } from '@nestjs/common';
import { LugarInterface } from '../../domain/lugar-domain/lugar.interface';
import { Lugar } from '../../domain/lugar-domain/lugar.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Lugar.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class LugarRepository implements LugarInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Lugar[]> {
        const query = this.postgresService.getQuery('get-all-lugares');
        const result = await this.postgresService.query<Lugar>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Lugar | null> {
        const query = this.postgresService.getQuery('get-lugar');
        const result = await this.postgresService.query<Lugar>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createLugar.
     * @param nombre_lugar Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createLugar(nombre_lugar: string): Promise<Lugar> {
        const query = this.postgresService.getQuery('insert-lugar');
        const result = await this.postgresService.query<Lugar>(query, [nombre_lugar]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateLugar.
     * @param id Parámetro de entrada de tipo number.
     * @param nombre_lugar Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateLugar(id: number, nombre_lugar: string): Promise<Lugar> {
        const query = this.postgresService.getQuery('update-lugar');
        const result = await this.postgresService.query<Lugar>(query, [nombre_lugar, id]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de deleteLugar.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteLugar(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-lugar');
        return this.postgresService.query<any[]>(query, [id]);
    }
}
