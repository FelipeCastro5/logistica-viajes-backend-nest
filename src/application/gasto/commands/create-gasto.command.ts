/**
 * Clase de comando CQRS que representa la operación CreateGastoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateGastoCommand {
  /**
     * Constructor del comando CreateGastoCommand.
     * @param nombre_gasto Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(public readonly nombre_gasto: string) {}
}
