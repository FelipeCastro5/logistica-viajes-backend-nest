/**
 * Clase de comando CQRS que representa la operación UpdateLugarCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateLugarCommand {
  /**
     * Constructor del comando UpdateLugarCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_lugar Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly nombre_lugar: string
  ) {}
}
