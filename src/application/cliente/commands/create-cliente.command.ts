/**
 * Clase de comando CQRS que representa la operación CreateClienteCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateClienteCommand {
  /**
     * Constructor del comando CreateClienteCommand.
     * @param fk_usuario Dato requerido de tipo number para la ejecución del comando.
     * @param nit Dato requerido de tipo string para la ejecución del comando.
     * @param nombre_cliente Dato requerido de tipo string para la ejecución del comando.
     * @param telefono Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly fk_usuario: number,
    public readonly nit: string,
    public readonly nombre_cliente: string,
    public readonly telefono: string,
  ) {}
}
