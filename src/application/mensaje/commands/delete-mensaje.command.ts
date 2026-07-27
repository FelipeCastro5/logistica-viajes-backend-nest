/**
 * Clase de comando CQRS que representa la operación DeleteMensajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteMensajeCommand {
  /**
     * Constructor del comando DeleteMensajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
