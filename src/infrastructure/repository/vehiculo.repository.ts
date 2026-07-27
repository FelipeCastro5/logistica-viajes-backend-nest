import { Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../domain/vehiculo-domain/vehiculo.interface';
import { Vehiculo } from '../../domain/vehiculo-domain/vehiculo.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Vehiculo.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class VehiculoRepository implements VehiculoInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Vehiculo[]> {
        const query = this.postgresService.getQuery('get-all-vehiculos');
        const result = await this.postgresService.query<Vehiculo>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Vehiculo | null> {
        const query = this.postgresService.getQuery('get-vehiculo');
        const result = await this.postgresService.query<Vehiculo>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createVehiculo.
     * @param fk_usuario Parámetro de entrada de tipo number | null.
     * @param placa Parámetro de entrada de tipo string.
     * @param marca Parámetro de entrada de tipo string.
     * @param configuracion Parámetro de entrada de tipo string.
     * @param tipo_vehiculo Parámetro de entrada de tipo string.
     * @param peso_vacio Parámetro de entrada de tipo number.
     * @param peso_remolque Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createVehiculo(
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<Vehiculo> {
        const query = this.postgresService.getQuery('insert-vehiculo');
        const params = [
          fk_usuario,
          placa,
          marca,
          configuracion,
          tipo_vehiculo,
          peso_vacio,
          peso_remolque,
        ];
        const result = await this.postgresService.query<Vehiculo>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateVehiculo.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_usuario Parámetro de entrada de tipo number | null.
     * @param placa Parámetro de entrada de tipo string.
     * @param marca Parámetro de entrada de tipo string.
     * @param configuracion Parámetro de entrada de tipo string.
     * @param tipo_vehiculo Parámetro de entrada de tipo string.
     * @param peso_vacio Parámetro de entrada de tipo number.
     * @param peso_remolque Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateVehiculo(
    id: number,
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<any> {
        const query = this.postgresService.getQuery('update-vehiculo');
        const params = [
          fk_usuario,
          placa,
          marca,
          configuracion,
          tipo_vehiculo,
          peso_vacio,
          peso_remolque,
          id,
        ];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteVehiculo.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteVehiculo(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-vehiculo');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getVehiculosByUsuario.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getVehiculosByUsuario(fk_usuario: number): Promise<Vehiculo[]> {
        const query = this.postgresService.getQuery('get-vehiculo-by-usuario');
        const result = await this.postgresService.query<Vehiculo>(query, [fk_usuario]);
        return result.rows || [];
    }
}
