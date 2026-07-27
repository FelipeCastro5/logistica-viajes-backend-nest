/**
 * Clase de comando CQRS que representa la operación DeleteLugarCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteLugarCommand {
  /**
     * Constructor del comando DeleteLugarCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
