/**
 * Clase de comando CQRS que representa la operación GetRemesaByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetRemesaByIdCommand {
  /**
     * Constructor del comando GetRemesaByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
