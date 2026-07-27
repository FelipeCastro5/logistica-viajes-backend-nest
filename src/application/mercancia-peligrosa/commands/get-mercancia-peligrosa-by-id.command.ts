/**
 * Clase de comando CQRS que representa la operación GetMercanciaPeligrosaByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetMercanciaPeligrosaByIdCommand {
  /**
     * Constructor del comando GetMercanciaPeligrosaByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
