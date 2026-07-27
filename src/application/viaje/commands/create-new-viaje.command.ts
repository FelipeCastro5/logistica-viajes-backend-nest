/**
 * Clase de comando CQRS que representa la operación CreateNewViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateNewViajeCommand {
  /**
     * Constructor del comando CreateNewViajeCommand.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param fk_cliente Dato requerido de tipo number para la ejecución del comando.
     * @param fk_origen Dato requerido de tipo number para la ejecución del comando.
     * @param fk_destino Dato requerido de tipo number para la ejecución del comando.
     * @param codigo Dato requerido de tipo string para la ejecución del comando.
     * @param observaciones Dato requerido de tipo string para la ejecución del comando.
     * @param producto Dato requerido de tipo string para la ejecución del comando.
     * @param detalle_producto Dato requerido de tipo string para la ejecución del comando.
     * @param direccion_llegada Dato requerido de tipo string para la ejecución del comando.
     * @param fecha_salida Dato requerido de tipo Date para la ejecución del comando.
     * @param fecha_llegada Dato requerido de tipo Date para la ejecución del comando.
     * @param latitud_origen Dato requerido de tipo number para la ejecución del comando.
     * @param longitud_origen Dato requerido de tipo number para la ejecución del comando.
     * @param latitud_destino Dato requerido de tipo number para la ejecución del comando.
     * @param longitud_destino Dato requerido de tipo number para la ejecución del comando.
     * @param hora_salida Dato requerido de tipo Date para la ejecución del comando.
     * @param hora_llegada Dato requerido de tipo Date para la ejecución del comando.
     * @param horas_pactadas_cargue Dato requerido de tipo number para la ejecución del comando.
     * @param horas_pactadas_descargue Dato requerido de tipo number para la ejecución del comando.
     * @param exoneracion_legal Dato requerido de tipo string para la ejecución del comando.
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
     * @param numero_remesa Dato requerido de tipo string para la ejecución del comando.
     * @param numero_autorizacion Dato requerido de tipo string para la ejecución del comando.
     * @param tipo_empaque Dato requerido de tipo string para la ejecución del comando.
     * @param naturaleza_carga Dato requerido de tipo string para la ejecución del comando.
     * @param codigo_armonizado Dato requerido de tipo string para la ejecución del comando.
     * @param cantidad Dato requerido de tipo number para la ejecución del comando.
     * @param unidad_medida Dato requerido de tipo string para la ejecución del comando.
     * @param peso_total Dato requerido de tipo number para la ejecución del comando.
     * @param mercancia_peligrosa Dato requerido de tipo boolean para la ejecución del comando.
     * @param observaciones_remesa Dato requerido de tipo string para la ejecución del comando.
     * @param codigo_un Dato requerido de tipo string para la ejecución del comando.
     * @param grupo_riesgo Dato requerido de tipo string para la ejecución del comando.
     * @param caracteristica_peligrosidad Dato requerido de tipo string para la ejecución del comando.
     * @param embalaje_envase Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    // viaje
    public readonly fk_usuario: number,
    public readonly fk_cliente: number,
    public readonly fk_origen: number,
    public readonly fk_destino: number,
    public readonly codigo: string,
    public readonly observaciones: string,
    public readonly producto: string,
    public readonly detalle_producto: string,
    public readonly direccion_llegada: string,
    public readonly fecha_salida: Date,
    public readonly fecha_llegada: Date,
    public readonly latitud_origen: number,
    public readonly longitud_origen: number,
    public readonly latitud_destino: number,
    public readonly longitud_destino: number,
    public readonly hora_salida: Date,
    public readonly hora_llegada: Date,
    public readonly horas_pactadas_cargue: number,
    public readonly horas_pactadas_descargue: number,
    public readonly exoneracion_legal: string,
    // Manifiesto
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
    // Remesa
    public readonly numero_remesa: string,
    public readonly numero_autorizacion: string,
    public readonly tipo_empaque: string,
    public readonly naturaleza_carga: string,
    public readonly codigo_armonizado: string,
    public readonly cantidad: number,
    public readonly unidad_medida: string,
    public readonly peso_total: number,
    public readonly mercancia_peligrosa: boolean,
    public readonly observaciones_remesa: string,
    // Mercancía peligrosa (opcionales)
    public readonly codigo_un?: string,
    public readonly grupo_riesgo?: string,
    public readonly caracteristica_peligrosidad?: string,
    public readonly embalaje_envase?: string,
  ) { }
}
