/**
 * Clase de comando CQRS que representa la operación GetMercanciaPeligrosaByRemesaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetMercanciaPeligrosaByRemesaCommand {
  /**
     * Constructor del comando GetMercanciaPeligrosaByRemesaCommand.
     * @param fk_remesa Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_remesa: number) {}
}
