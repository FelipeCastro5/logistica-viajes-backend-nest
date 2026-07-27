/**
 * Clase de comando CQRS que representa la operación UpdateMensajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateMensajeCommand {
  /**
     * Constructor del comando UpdateMensajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_chat Dato requerido de tipo number para la ejecución del comando.
     * @param pregunta Dato requerido de tipo string para la ejecución del comando.
     * @param respuesta Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_chat: number,
    public readonly pregunta: string,
    public readonly respuesta: string
  ) {}
}
