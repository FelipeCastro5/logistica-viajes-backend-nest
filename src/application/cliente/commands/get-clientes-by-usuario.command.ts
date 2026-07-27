/**
 * Clase de comando CQRS que representa la operación GetClientesByUsuarioCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetClientesByUsuarioCommand {
  /**
     * Constructor del comando GetClientesByUsuarioCommand.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_usuario: number) {}
}
