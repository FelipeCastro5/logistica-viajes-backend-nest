// get-manifiesto-by-id.command.ts
/**
 * Clase de comando CQRS que representa la operación GetManifiestoByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetManifiestoByIdCommand {
  /**
     * Constructor del comando GetManifiestoByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
