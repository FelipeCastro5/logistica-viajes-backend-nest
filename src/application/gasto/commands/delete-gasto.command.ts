/**
 * Clase de comando CQRS que representa la operación DeleteGastoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteGastoCommand {
  /**
     * Constructor del comando DeleteGastoCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
