/**
 * Clase de comando CQRS que representa la operación DownloadGastoXViajeFacturaCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class DownloadGastoXViajeFacturaCommand {
  /**
     * Constructor del comando DownloadGastoXViajeFacturaCommand.
     * @param reference Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly reference: string,
  ) {}
}