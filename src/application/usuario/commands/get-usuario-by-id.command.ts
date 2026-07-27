// get-usuario-by-id.command.ts
/**
 * Clase de comando CQRS que representa la operación GetUsuarioByIdCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetUsuarioByIdCommand {
  /**
     * Constructor del comando GetUsuarioByIdCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly id: number) {}
}
