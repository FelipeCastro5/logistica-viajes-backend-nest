/**
 * Clase de comando CQRS que representa la operación UpdateChatCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateChatCommand {
  /**
     * Constructor del comando UpdateChatCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_chat Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_usuario: number,
    public readonly nombre_chat: string,
  ) {}
}
