import { Manifiesto } from './manifiesto.entity';

export interface ManifiestoInterface {
  getAll(): Promise<Manifiesto[]>;
  getById(id: number): Promise<Manifiesto | null>;
  createManifiesto(
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
  ): Promise<Manifiesto>;
  updateManifiesto(
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
  ): Promise<any>;
  deleteManifiesto(id: number): Promise<any>;
}
