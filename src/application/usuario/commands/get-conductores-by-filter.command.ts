/**
 * Clase de comando CQRS que representa la operación GetConductoresByFilterCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class GetConductoresByFilterCommand {
  /**
     * Constructor del comando GetConductoresByFilterCommand.
     * @param filter Dato requerido de tipo string para la ejecución del comando.
     * @param limit Dato requerido de tipo number para la ejecución del comando.
     * @param page Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly filter: string,
    public readonly limit: number,
    public readonly page: number
  ) {}
}
