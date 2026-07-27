/**
 * Clase de comando CQRS que representa la operación CreateLugarCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateLugarCommand {
  /**
     * Constructor del comando CreateLugarCommand.
     * @param nombre_lugar Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(public readonly nombre_lugar: string) {}
}
