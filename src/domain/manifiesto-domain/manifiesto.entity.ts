/**
 * Clase de entidad que representa a Manifiesto dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Manifiesto {
  /**
     * Propiedad de la entidad que representa id manifiesto.
     * Contiene un valor de tipo: number.
     */
    id_manifiesto: number;
  /**
     * Propiedad de la entidad que representa fk vehiculo.
     * Contiene un valor de tipo: number.
     */
    fk_vehiculo: number;

  /**
     * Propiedad de la entidad que representa flete total.
     * Contiene un valor de tipo: number.
     */
    flete_total: number;
  /**
     * Propiedad de la entidad que representa porcentaje retencion fuente.
     * Contiene un valor de tipo: number.
     */
    porcentaje_retencion_fuente: number;
  /**
     * Propiedad de la entidad que representa valor retencion fuente.
     * Contiene un valor de tipo: number.
     */
    valor_retencion_fuente: number;
  /**
     * Propiedad de la entidad que representa porcentaje ica.
     * Contiene un valor de tipo: number.
     */
    porcentaje_ica: number;
  /**
     * Propiedad de la entidad que representa valor ica.
     * Contiene un valor de tipo: number.
     */
    valor_ica: number;
  /**
     * Propiedad de la entidad que representa deduccion fiscal.
     * Contiene un valor de tipo: number.
     */
    deduccion_fiscal: number;
  /**
     * Propiedad de la entidad que representa neto a pagar.
     * Contiene un valor de tipo: number.
     */
    neto_a_pagar: number;
  /**
     * Propiedad de la entidad que representa anticipo.
     * Contiene un valor de tipo: number.
     */
    anticipo: number;
  /**
     * Propiedad de la entidad que representa saldo a pagar.
     * Contiene un valor de tipo: number.
     */
    saldo_a_pagar: number;
  /**
     * Propiedad de la entidad que representa total gastos.
     * Contiene un valor de tipo: number.
     */
    total_gastos: number;
  /**
     * Propiedad de la entidad que representa queda al carro.
     * Contiene un valor de tipo: number.
     */
    queda_al_carro: number;
  /**
     * Propiedad de la entidad que representa a favor del carro.
     * Contiene un valor de tipo: number.
     */
    a_favor_del_carro: number;
  /**
     * Propiedad de la entidad que representa porcentaje conductor.
     * Contiene un valor de tipo: number.
     */
    porcentaje_conductor: number;
  /**
     * Propiedad de la entidad que representa ganancia conductor.
     * Contiene un valor de tipo: number.
     */
    ganancia_conductor: number;
}
