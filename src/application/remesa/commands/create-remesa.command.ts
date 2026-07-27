/**
 * Clase de comando CQRS que representa la operación CreateRemesaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateRemesaCommand {
  /**
     * Constructor del comando CreateRemesaCommand.
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
     */
    constructor(
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
  ) {}
}
