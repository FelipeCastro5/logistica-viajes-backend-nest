/**
 * Clase de comando CQRS que representa la operación GetTipodocByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetTipodocByIdCommand {
  /**
     * Constructor del comando GetTipodocByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
