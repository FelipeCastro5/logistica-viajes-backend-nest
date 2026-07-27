/**
 * Clase de comando CQRS que representa la operación GetChatByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetChatByIdCommand {
  /**
     * Constructor del comando GetChatByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
