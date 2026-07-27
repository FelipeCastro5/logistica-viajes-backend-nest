import { Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../domain/manifiesto-domain/manifiesto.interface';
import { Manifiesto } from '../../domain/manifiesto-domain/manifiesto.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Manifiesto.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class ManifiestoRepository implements ManifiestoInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Manifiesto[]> {
        const query = this.postgresService.getQuery('get-all-manifiestos');
        const result = await this.postgresService.query<Manifiesto>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Manifiesto | null> {
        const query = this.postgresService.getQuery('get-manifiesto');
        const result = await this.postgresService.query<Manifiesto>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createManifiesto.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @param flete_total Parámetro de entrada de tipo number.
     * @param porcentaje_retencion_fuente Parámetro de entrada de tipo number.
     * @param valor_retencion_fuente Parámetro de entrada de tipo number.
     * @param porcentaje_ica Parámetro de entrada de tipo number.
     * @param valor_ica Parámetro de entrada de tipo number.
     * @param deduccion_fiscal Parámetro de entrada de tipo number.
     * @param neto_a_pagar Parámetro de entrada de tipo number.
     * @param anticipo Parámetro de entrada de tipo number.
     * @param saldo_a_pagar Parámetro de entrada de tipo number.
     * @param total_gastos Parámetro de entrada de tipo number.
     * @param queda_al_carro Parámetro de entrada de tipo number.
     * @param a_favor_del_carro Parámetro de entrada de tipo number.
     * @param porcentaje_conductor Parámetro de entrada de tipo number.
     * @param ganancia_conductor Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createManifiesto(
    fk_vehiculo: number,
    flete_total: number,
    porcentaje_retencion_fuente: number,
    valor_retencion_fuente: number,
    porcentaje_ica: number,
    valor_ica: number,
    deduccion_fiscal: number,
    neto_a_pagar: number,
    anticipo: number,
    saldo_a_pagar: number,
    total_gastos: number,
    queda_al_carro: number,
    a_favor_del_carro: number,
    porcentaje_conductor: number,
    ganancia_conductor: number
  ): Promise<Manifiesto> {
        const query = this.postgresService.getQuery('insert-manifiesto');
        const params = [
          fk_vehiculo,
          flete_total,
          porcentaje_retencion_fuente,
          valor_retencion_fuente,
          porcentaje_ica,
          valor_ica,
          deduccion_fiscal,
          neto_a_pagar,
          anticipo,
          saldo_a_pagar,
          total_gastos,
          queda_al_carro,
          a_favor_del_carro,
          porcentaje_conductor,
          ganancia_conductor,
        ];
        const result = await this.postgresService.query<Manifiesto>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateManifiesto.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @param flete_total Parámetro de entrada de tipo number.
     * @param porcentaje_retencion_fuente Parámetro de entrada de tipo number.
     * @param valor_retencion_fuente Parámetro de entrada de tipo number.
     * @param porcentaje_ica Parámetro de entrada de tipo number.
     * @param valor_ica Parámetro de entrada de tipo number.
     * @param deduccion_fiscal Parámetro de entrada de tipo number.
     * @param neto_a_pagar Parámetro de entrada de tipo number.
     * @param anticipo Parámetro de entrada de tipo number.
     * @param saldo_a_pagar Parámetro de entrada de tipo number.
     * @param total_gastos Parámetro de entrada de tipo number.
     * @param queda_al_carro Parámetro de entrada de tipo number.
     * @param a_favor_del_carro Parámetro de entrada de tipo number.
     * @param porcentaje_conductor Parámetro de entrada de tipo number.
     * @param ganancia_conductor Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateManifiesto(
    id: number,
    fk_vehiculo: number,
    flete_total: number,
    porcentaje_retencion_fuente: number,
    valor_retencion_fuente: number,
    porcentaje_ica: number,
    valor_ica: number,
    deduccion_fiscal: number,
    neto_a_pagar: number,
    anticipo: number,
    saldo_a_pagar: number,
    total_gastos: number,
    queda_al_carro: number,
    a_favor_del_carro: number,
    porcentaje_conductor: number,
    ganancia_conductor: number
  ): Promise<any> {
        const query = this.postgresService.getQuery('update-manifiesto');
        const params = [
          fk_vehiculo,
          flete_total,
          porcentaje_retencion_fuente,
          valor_retencion_fuente,
          porcentaje_ica,
          valor_ica,
          deduccion_fiscal,
          neto_a_pagar,
          anticipo,
          saldo_a_pagar,
          total_gastos,
          queda_al_carro,
          a_favor_del_carro,
          porcentaje_conductor,
          ganancia_conductor,
          id,
        ];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteManifiesto.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteManifiesto(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-manifiesto');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de updateTotalGastosManifiesto.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param totalGastos Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateTotalGastosManifiesto(fk_viaje: number, totalGastos: number): Promise<any> {
        const query = this.postgresService.getQuery('update-total-gastos');
        const params = [fk_viaje, totalGastos];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de getTotalGastosByViajeId.
     * @param id_viaje Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getTotalGastosByViajeId(id_viaje: number): Promise<number> {
        const query = this.postgresService.getQuery('get-total-gastos-from-viaje');
        const params = [id_viaje];
        const result = await this.postgresService.query<any[]>(query, params);
        return result.rows[0]?.total_gastos ?? 0;
    }
}
