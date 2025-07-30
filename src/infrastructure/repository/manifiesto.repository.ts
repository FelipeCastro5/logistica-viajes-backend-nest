import { Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../domain/manifiesto-domain/manifiesto.interface';
import { Manifiesto } from '../../domain/manifiesto-domain/manifiesto.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class ManifiestoRepository implements ManifiestoInterface {
  constructor(private readonly postgresService: PostgresService) { }

  async getAll(): Promise<Manifiesto[]> {
    const query = this.postgresService.getQuery('get-all-manifiestos');
    const result = await this.postgresService.query<Manifiesto>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Manifiesto | null> {
    const query = this.postgresService.getQuery('get-manifiesto');
    const result = await this.postgresService.query<Manifiesto>(query, [id]);
    return result.rows[0] || null;
  }

  async createManifiesto(
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

  async updateManifiesto(
    id: number,
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

  async deleteManifiesto(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-manifiesto');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async updateTotalGastosManifiesto(fk_viaje: number): Promise<any> {
    const query = this.postgresService.getQuery('update-total-gastos');
    const params = [fk_viaje];
    return this.postgresService.query<any[]>(query, params);
  }
  // NUEVO: Obtener total de gastos por manifiesto
  async getTotalGastosByManifiesto(manifiestoId: number): Promise<number> {
    const query = this.postgresService.getQuery('get-total-gastos-from-manifiesto');
    const result = await this.postgresService.query<{ total_gastos: number }[]>(query, [manifiestoId]);
    return result[0]?.total_gastos ?? 0;
  }

  // NUEVO: Actualizar el total_gastos del manifiesto directamente
  async updateTotalGastosByManifiesto(manifiestoId: number, totalGastos: number): Promise<any> {
    const query = this.postgresService.getQuery('update-total-gastos-manifiesto');
    const params = [manifiestoId, totalGastos];
    return this.postgresService.query<any[]>(query, params);
  }
}
