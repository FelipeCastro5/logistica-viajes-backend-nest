/**
 * Clase de comando CQRS que representa la operación CreateGastoXViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateGastoXViajeCommand {
  /**
     * Constructor del comando CreateGastoXViajeCommand.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     * @param fk_gasto Dato requerido de tipo number para la ejecución del comando.
     * @param valor Dato requerido de tipo number para la ejecución del comando.
     * @param detalles Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly fk_viaje: number,
    public readonly fk_gasto: number,
    public readonly valor: number,
    public readonly detalles: string,
  ) {}
}
