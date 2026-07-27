/**
 * Clase de comando CQRS que representa la operación GetViajeByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetViajeByIdCommand {
  /**
     * Constructor del comando GetViajeByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
