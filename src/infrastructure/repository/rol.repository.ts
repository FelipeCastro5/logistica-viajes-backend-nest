import { Injectable } from '@nestjs/common';
import { RolInterface } from '../../domain/rol-domain/rol.interface';
import { Rol } from '../../domain/rol-domain/rol.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Rol.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class RolRepository implements RolInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Rol[]> {
        const query = this.postgresService.getQuery('get-all-roles');
        const result = await this.postgresService.query<Rol>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Rol | null> {
        const query = this.postgresService.getQuery('get-rol');
        const result = await this.postgresService.query<Rol>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createRol.
     * @param nombre_rol Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createRol(nombre_rol: string): Promise<Rol> {
        const query = this.postgresService.getQuery('insert-rol');
        const result = await this.postgresService.query<Rol>(query, [nombre_rol]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateRol.
     * @param id Parámetro de entrada de tipo number.
     * @param nombre_rol Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateRol(id: number, nombre_rol: string): Promise<any> {
        const query = this.postgresService.getQuery('update-rol');
        return this.postgresService.query<any[]>(query, [nombre_rol, id]);
    }

  /**
     * Ejecuta la operación técnica de deleteRol.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteRol(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-rol');
        return this.postgresService.query<any[]>(query, [id]);
    }
}
