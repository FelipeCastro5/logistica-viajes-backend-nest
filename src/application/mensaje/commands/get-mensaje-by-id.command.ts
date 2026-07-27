/**
 * Clase de comando CQRS que representa la operación GetMensajeByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetMensajeByIdCommand {
  /**
     * Constructor del comando GetMensajeByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
