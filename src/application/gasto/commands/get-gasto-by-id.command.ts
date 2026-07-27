/**
 * Clase de comando CQRS que representa la operación GetGastoByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetGastoByIdCommand {
  /**
     * Constructor del comando GetGastoByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
