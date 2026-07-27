/**
 * Clase de comando CQRS que representa la operación UpdateRolCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateRolCommand {
  /**
     * Constructor del comando UpdateRolCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param nombre_rol Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly nombre_rol: string
  ) {}
}
