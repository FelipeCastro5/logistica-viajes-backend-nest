/**
 * Clase de comando CQRS que representa la operación DeleteTipodocCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteTipodocCommand {
  /**
     * Constructor del comando DeleteTipodocCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
