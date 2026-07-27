/**
 * Clase de comando CQRS que representa la operación DeleteChatCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteChatCommand {
  /**
     * Constructor del comando DeleteChatCommand.
     * @param id_chat Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id_chat: number) {}
}
