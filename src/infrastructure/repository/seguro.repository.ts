import { Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../domain/seguro-domain/seguro.interface';
import { Seguro } from '../../domain/seguro-domain/seguro.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Seguro.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class SeguroRepository implements SeguroInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Seguro[]> {
        const query = this.postgresService.getQuery('get-all-seguros');
        const result = await this.postgresService.query<Seguro>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Seguro | null> {
        const query = this.postgresService.getQuery('get-seguro');
        const result = await this.postgresService.query<Seguro>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createSeguro.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @param tipo_seguro Parámetro de entrada de tipo string.
     * @param numero_poliza Parámetro de entrada de tipo string.
     * @param aseguradora Parámetro de entrada de tipo string.
     * @param fecha_vencimiento Parámetro de entrada de tipo Date.
     * @param valor Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de updateSeguro.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @param tipo_seguro Parámetro de entrada de tipo string.
     * @param numero_poliza Parámetro de entrada de tipo string.
     * @param aseguradora Parámetro de entrada de tipo string.
     * @param fecha_vencimiento Parámetro de entrada de tipo Date.
     * @param valor Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de deleteSeguro.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteSeguro(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-seguro');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getSegurosByVehiculo.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getSegurosByVehiculo(fk_vehiculo: number): Promise<Seguro[]> {
        const query = this.postgresService.getQuery('get-seguro-by-vehiculo');
        const result = await this.postgresService.query<Seguro>(query, [fk_vehiculo]);
        return result.rows || [];
    }
}
