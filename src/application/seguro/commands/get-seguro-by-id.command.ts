/**
 * Clase de comando CQRS que representa la operación GetSeguroByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetSeguroByIdCommand {
  /**
     * Constructor del comando GetSeguroByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
