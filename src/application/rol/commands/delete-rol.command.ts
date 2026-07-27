/**
 * Clase de comando CQRS que representa la operación DeleteRolCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteRolCommand {
  /**
     * Constructor del comando DeleteRolCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
