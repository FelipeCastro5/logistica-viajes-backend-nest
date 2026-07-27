/**
 * Clase de comando CQRS que representa la operación GetVehiculosByUsuarioCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetVehiculosByUsuarioCommand {
  /**
     * Constructor del comando GetVehiculosByUsuarioCommand.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(public readonly fk_usuario: number) {}
}
