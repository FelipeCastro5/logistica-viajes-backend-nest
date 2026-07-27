/**
 * Clase de comando CQRS que representa la operación DeleteFirmaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteFirmaCommand {
  /**
     * Constructor del comando DeleteFirmaCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
