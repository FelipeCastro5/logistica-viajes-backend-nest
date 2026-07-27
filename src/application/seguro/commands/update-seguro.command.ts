/**
 * Clase de comando CQRS que representa la operación UpdateSeguroCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateSeguroCommand {
  /**
     * Constructor del comando UpdateSeguroCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_vehiculo Dato requerido de tipo number para la ejecución del comando.
     * @param tipo_seguro Dato requerido de tipo string para la ejecución del comando.
     * @param numero_poliza Dato requerido de tipo string para la ejecución del comando.
     * @param aseguradora Dato requerido de tipo string para la ejecución del comando.
     * @param fecha_vencimiento Dato requerido de tipo Date para la ejecución del comando.
     * @param valor Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_vehiculo: number,
    public readonly tipo_seguro: string,
    public readonly numero_poliza: string,
    public readonly aseguradora: string,
    public readonly fecha_vencimiento: Date,
    public readonly valor: number,
  ) {}
}
