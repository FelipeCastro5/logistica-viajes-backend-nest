/**
 * Clase de comando CQRS que representa la operación CreateChatCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateChatCommand {
  /**
     * Constructor del comando CreateChatCommand.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_chat Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly fk_usuario: number,
    public readonly nombre_chat: string,
  ) {}
}
