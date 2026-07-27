/**
 * Clase de comando CQRS que representa la operación GetGastosByViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetGastosByViajeCommand {
  /**
     * Constructor del comando GetGastosByViajeCommand.
     * @param fk Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk: number) {}
}
