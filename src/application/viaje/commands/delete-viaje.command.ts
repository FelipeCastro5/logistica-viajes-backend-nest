/**
 * Clase de comando CQRS que representa la operación DeleteViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteViajeCommand {
  /**
     * Constructor del comando DeleteViajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
