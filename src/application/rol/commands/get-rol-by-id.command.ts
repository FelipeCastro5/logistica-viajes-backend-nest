/**
 * Clase de comando CQRS que representa la operación GetRolByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetRolByIdCommand {
  /**
     * Constructor del comando GetRolByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
