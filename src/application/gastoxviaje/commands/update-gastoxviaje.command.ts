/**
 * Clase de comando CQRS que representa la operación UpdateGastoXViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateGastoXViajeCommand {
  /**
     * Constructor del comando UpdateGastoXViajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_viaje Dato requerido de tipo number para la ejecución del comando.
     * @param fk_gasto Dato requerido de tipo number para la ejecución del comando.
     * @param valor Dato requerido de tipo number para la ejecución del comando.
     * @param detalles Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_viaje: number,
    public readonly fk_gasto: number,
    public readonly valor: number,
    public readonly detalles: string,
  ) {}
}
