/**
 * Clase de comando CQRS que representa la operación CreateSeguroCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateSeguroCommand {
  /**
     * Constructor del comando CreateSeguroCommand.
     * @param fk_vehiculo Dato requerido de tipo number para la ejecución del comando.
     * @param tipo_seguro Dato requerido de tipo string para la ejecución del comando.
     * @param numero_poliza Dato requerido de tipo string para la ejecución del comando.
     * @param aseguradora Dato requerido de tipo string para la ejecución del comando.
     * @param fecha_vencimiento Dato requerido de tipo Date para la ejecución del comando.
     * @param valor Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly fk_vehiculo: number,
    public readonly tipo_seguro: string,
    public readonly numero_poliza: string,
    public readonly aseguradora: string,
    public readonly fecha_vencimiento: Date,
    public readonly valor: number,
  ) {}
}
