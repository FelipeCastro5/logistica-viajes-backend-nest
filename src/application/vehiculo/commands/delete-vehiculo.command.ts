/**
 * Clase de comando CQRS que representa la operación DeleteVehiculoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteVehiculoCommand {
  /**
     * Constructor del comando DeleteVehiculoCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
