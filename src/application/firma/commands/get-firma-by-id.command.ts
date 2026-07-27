/**
 * Clase de comando CQRS que representa la operación GetFirmaByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetFirmaByIdCommand {
  /**
     * Constructor del comando GetFirmaByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
