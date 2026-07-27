/**
 * Clase de comando CQRS que representa la operación GetVehiculoByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetVehiculoByIdCommand {
  /**
     * Constructor del comando GetVehiculoByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
