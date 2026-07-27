/**
 * Clase de comando CQRS que representa la operación DeleteGastoXViajeCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteGastoXViajeCommand {
  /**
     * Constructor del comando DeleteGastoXViajeCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
