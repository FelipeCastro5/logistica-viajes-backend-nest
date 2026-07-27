/**
 * Clase de comando CQRS que representa la operación DeleteGastoXViajeFacturaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DeleteGastoXViajeFacturaCommand {
  /**
     * Constructor del comando DeleteGastoXViajeFacturaCommand.
     * @param id_gastoxviaje Dato requerido de tipo number para la ejecución del comando.
     */
    constructor(
    public readonly id_gastoxviaje: number,
  ) {}
}