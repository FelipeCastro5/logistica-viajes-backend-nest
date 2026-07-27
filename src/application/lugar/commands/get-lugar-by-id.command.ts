/**
 * Clase de comando CQRS que representa la operación GetLugarByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetLugarByIdCommand {
  /**
     * Constructor del comando GetLugarByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
