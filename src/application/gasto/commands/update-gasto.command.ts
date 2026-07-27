/**
 * Clase de comando CQRS que representa la operación UpdateGastoCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateGastoCommand {
  /**
     * Constructor del comando UpdateGastoCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_gasto Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly nombre_gasto: string
  ) {}
}
