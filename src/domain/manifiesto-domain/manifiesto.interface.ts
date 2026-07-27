import { Manifiesto } from './manifiesto.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para ManifiestoInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface ManifiestoInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Manifiesto[]>.
     */
    getAll(): Promise<Manifiesto[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Manifiesto | null>.
     */
    getById(id: number): Promise<Manifiesto | null>;
  /**
     * Método encargado de ejecutar la operación de createManifiesto.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @param flete_total El parámetro que recibe información de tipo number.
     * @param porcentaje_retencion_fuente El parámetro que recibe información de tipo number.
     * @param valor_retencion_fuente El parámetro que recibe información de tipo number.
     * @param porcentaje_ica El parámetro que recibe información de tipo number.
     * @param valor_ica El parámetro que recibe información de tipo number.
     * @param deduccion_fiscal El parámetro que recibe información de tipo number.
     * @param neto_a_pagar El parámetro que recibe información de tipo number.
     * @param anticipo El parámetro que recibe información de tipo number.
     * @param saldo_a_pagar El parámetro que recibe información de tipo number.
     * @param total_gastos El parámetro que recibe información de tipo number.
     * @param queda_al_carro El parámetro que recibe información de tipo number.
     * @param a_favor_del_carro El parámetro que recibe información de tipo number.
     * @param porcentaje_conductor El parámetro que recibe información de tipo number.
     * @param ganancia_conductor El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Manifiesto>.
     */
    createManifiesto(
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
  ): Promise<Manifiesto>;
  /**
     * Método encargado de ejecutar la operación de updateManifiesto.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @param flete_total El parámetro que recibe información de tipo number.
     * @param porcentaje_retencion_fuente El parámetro que recibe información de tipo number.
     * @param valor_retencion_fuente El parámetro que recibe información de tipo number.
     * @param porcentaje_ica El parámetro que recibe información de tipo number.
     * @param valor_ica El parámetro que recibe información de tipo number.
     * @param deduccion_fiscal El parámetro que recibe información de tipo number.
     * @param neto_a_pagar El parámetro que recibe información de tipo number.
     * @param anticipo El parámetro que recibe información de tipo number.
     * @param saldo_a_pagar El parámetro que recibe información de tipo number.
     * @param total_gastos El parámetro que recibe información de tipo number.
     * @param queda_al_carro El parámetro que recibe información de tipo number.
     * @param a_favor_del_carro El parámetro que recibe información de tipo number.
     * @param porcentaje_conductor El parámetro que recibe información de tipo number.
     * @param ganancia_conductor El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateManifiesto(
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
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteManifiesto.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteManifiesto(id: number): Promise<any>;
  
  /**
     * Método encargado de ejecutar la operación de updateTotalGastosManifiesto.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param totalGastos El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateTotalGastosManifiesto(fk_viaje: number, totalGastos: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getTotalGastosByViajeId.
     * @param viajeId El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<number>.
     */
    getTotalGastosByViajeId(viajeId: number): Promise<number>;

}
