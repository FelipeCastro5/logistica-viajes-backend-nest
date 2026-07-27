/**
 * Clase de comando CQRS que representa la operación CreateTipodocCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateTipodocCommand {
  /**
     * Constructor del comando CreateTipodocCommand.
     * @param nombre_documento Dato requerido de tipo string para la ejecución del comando.
     * @param abreviatura Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly nombre_documento: string,
    public readonly abreviatura: string,
  ) {}
}
