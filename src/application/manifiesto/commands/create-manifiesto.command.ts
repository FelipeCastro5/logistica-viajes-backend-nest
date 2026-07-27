// create-manifiesto.command.ts
/**
 * Clase de comando CQRS que representa la operación CreateManifiestoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateManifiestoCommand {
  /**
     * Constructor del comando CreateManifiestoCommand.
     * @param fk_vehiculo Dato requerido de tipo number para la ejecución del comando.
     * @param flete_total Dato requerido de tipo number para la ejecución del comando.
     * @param porcentaje_retencion_fuente Dato requerido de tipo number para la ejecución del comando.
     * @param valor_retencion_fuente Dato requerido de tipo number para la ejecución del comando.
     * @param porcentaje_ica Dato requerido de tipo number para la ejecución del comando.
     * @param valor_ica Dato requerido de tipo number para la ejecución del comando.
     * @param deduccion_fiscal Dato requerido de tipo number para la ejecución del comando.
     * @param neto_a_pagar Dato requerido de tipo number para la ejecución del comando.
     * @param anticipo Dato requerido de tipo number para la ejecución del comando.
     * @param saldo_a_pagar Dato requerido de tipo number para la ejecución del comando.
     * @param total_gastos Dato requerido de tipo number para la ejecución del comando.
     * @param queda_al_carro Dato requerido de tipo number para la ejecución del comando.
     * @param a_favor_del_carro Dato requerido de tipo number para la ejecución del comando.
     * @param porcentaje_conductor Dato requerido de tipo number para la ejecución del comando.
     * @param ganancia_conductor Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly fk_vehiculo: number,
    public readonly flete_total: number,
    public readonly porcentaje_retencion_fuente: number,
    public readonly valor_retencion_fuente: number,
    public readonly porcentaje_ica: number,
    public readonly valor_ica: number,
    public readonly deduccion_fiscal: number,
    public readonly neto_a_pagar: number,
    public readonly anticipo: number,
    public readonly saldo_a_pagar: number,
    public readonly total_gastos: number,
    public readonly queda_al_carro: number,
    public readonly a_favor_del_carro: number,
    public readonly porcentaje_conductor: number,
    public readonly ganancia_conductor: number,
  ) {}
}
