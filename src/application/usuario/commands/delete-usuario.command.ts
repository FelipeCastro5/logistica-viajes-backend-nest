// delete-usuario.command.ts
/**
 * Clase de comando CQRS que representa la operación DeleteUsuarioCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteUsuarioCommand {
  /**
     * Constructor del comando DeleteUsuarioCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
