import { Injectable } from '@nestjs/common';
import { HistorialInterface } from '../../domain/historial-domain/historial.interface';
import { Historial } from '../../domain/historial-domain/historial.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Historial.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class HistorialRepository implements HistorialInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de insertHistorial.
     * @param fk_user Parámetro de entrada de tipo number.
     * @param question Parámetro de entrada de tipo string.
     * @param answer Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async insertHistorial(fk_user: number, question: string, answer: string): Promise<Historial> {
        const query = this.postgresService.getQuery('insert-historial');
        const result = await this.postgresService.query<Historial>(query, [fk_user, question, answer]);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de getLastFive.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getLastFive(): Promise<Historial[]> {
        const query = this.postgresService.getQuery('get-last-five-historial');
        const result = await this.postgresService.query<Historial>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getLastFiveByUser.
     * @param fk_user Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getLastFiveByUser(fk_user: number): Promise<Historial[]> {
        const query = this.postgresService.getQuery('get-last-five-historial-by-user');
        const result = await this.postgresService.query<Historial>(query, [fk_user]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

}
