/**
 * Clase de comando CQRS que representa la operación GetGastoXViajeByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetGastoXViajeByIdCommand {
  /**
     * Constructor del comando GetGastoXViajeByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
