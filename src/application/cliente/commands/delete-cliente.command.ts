/**
 * Clase de comando CQRS que representa la operación DeleteClienteCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteClienteCommand {
  /**
     * Constructor del comando DeleteClienteCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
