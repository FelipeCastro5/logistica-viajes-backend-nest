/**
 * Clase de comando CQRS que representa la operación UpdateRemesaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateRemesaCommand {
  /**
     * Constructor del comando UpdateRemesaCommand.
     * @param id_remesa Dato requerido de tipo number para la ejecución del comando.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     * @param numero_remesa Dato requerido de tipo string para la ejecución del comando.
     * @param numero_autorizacion Dato requerido de tipo string para la ejecución del comando.
     * @param tipo_empaque Dato requerido de tipo string para la ejecución del comando.
     * @param naturaleza_carga Dato requerido de tipo string para la ejecución del comando.
     * @param codigo_armonizado Dato requerido de tipo string para la ejecución del comando.
     * @param cantidad Dato requerido de tipo number para la ejecución del comando.
     * @param unidad_medida Dato requerido de tipo string para la ejecución del comando.
     * @param peso_total Dato requerido de tipo number para la ejecución del comando.
     * @param mercancia_peligrosa Dato requerido de tipo boolean para la ejecución del comando.
     * @param observaciones Dato requerido de tipo string para la ejecución del comando.
     * @param id_mercancia Dato requerido de tipo number para la ejecución del comando.
     * @param codigo_un Dato requerido de tipo string para la ejecución del comando.
     * @param grupo_riesgo Dato requerido de tipo string para la ejecución del comando.
     * @param caracteristica_peligrosidad Dato requerido de tipo string para la ejecución del comando.
     * @param embalaje_envase Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id_remesa: number,
    public readonly fk_viaje: number,
    public readonly numero_remesa: string,
    public readonly numero_autorizacion: string,
    public readonly tipo_empaque: string,
    public readonly naturaleza_carga: string,
    public readonly codigo_armonizado: string,
    public readonly cantidad: number,
    public readonly unidad_medida: string,
    public readonly peso_total: number,
    public readonly mercancia_peligrosa: boolean,
    public readonly observaciones: string,
    
    public readonly id_mercancia?: number,
    public readonly codigo_un?: string,
    public readonly grupo_riesgo?: string,
    public readonly caracteristica_peligrosidad?: string,
    public readonly embalaje_envase?: string,
  ) {}
}
