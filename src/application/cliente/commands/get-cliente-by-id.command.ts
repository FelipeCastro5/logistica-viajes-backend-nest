/**
 * Clase de comando CQRS que representa la operación GetClienteByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetClienteByIdCommand {
  /**
     * Constructor del comando GetClienteByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
