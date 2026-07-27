/**
 * Clase de comando CQRS que representa la operación UpdateTipodocCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateTipodocCommand {
  /**
     * Constructor del comando UpdateTipodocCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_documento Dato requerido de tipo string para la ejecución del comando.
     * @param abreviatura Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly nombre_documento: string,
    public readonly abreviatura: string,
  ) {}
}
