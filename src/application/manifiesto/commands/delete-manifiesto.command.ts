// delete-manifiesto.command.ts
/**
 * Clase de comando CQRS que representa la operación DeleteManifiestoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteManifiestoCommand {
  /**
     * Constructor del comando DeleteManifiestoCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
