/**
 * Clase de comando CQRS que representa la operación GetViajesPaginatedByUsuarioCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetViajesPaginatedByUsuarioCommand {
  /**
     * Constructor del comando GetViajesPaginatedByUsuarioCommand.
     * @param id_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param page Dato requerido de tipo number para la ejecución del comando.
     * @param limit Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly id_usuario: number,
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}
