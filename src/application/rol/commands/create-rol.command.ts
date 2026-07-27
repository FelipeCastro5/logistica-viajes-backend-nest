/**
 * Clase de comando CQRS que representa la operación CreateRolCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class CreateRolCommand {
  /**
     * Constructor del comando CreateRolCommand.
     * @param nombre_rol Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(public readonly nombre_rol: string) {}
}
