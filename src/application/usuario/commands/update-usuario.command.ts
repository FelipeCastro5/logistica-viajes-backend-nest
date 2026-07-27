// update-usuario.command.ts
/**
 * Clase de comando CQRS que representa la operación UpdateUsuarioCommand.
 * Encapsula los datos necesarios para ejecutar el caso de uso.
 */
export class UpdateUsuarioCommand {
  /**
     * Constructor del comando UpdateUsuarioCommand.
     * @param id Dato requerido de tipo number para la ejecución del comando.
     * @param fk_tipodoc Dato requerido de tipo number para la ejecución del comando.
     * @param num_doc Dato requerido de tipo string para la ejecución del comando.
     * @param fk_rol Dato requerido de tipo number para la ejecución del comando.
     * @param fk_contador Dato requerido de tipo number para la ejecución del comando.
     * @param p_nombre Dato requerido de tipo string para la ejecución del comando.
     * @param s_nombre Dato requerido de tipo string para la ejecución del comando.
     * @param p_apellido Dato requerido de tipo string para la ejecución del comando.
     * @param s_apellido Dato requerido de tipo string para la ejecución del comando.
     * @param telefono Dato requerido de tipo string para la ejecución del comando.
     */
    constructor(
    public readonly id: number,
    public readonly fk_tipodoc: number,
    public readonly num_doc: string,
    public readonly fk_rol: number,
    public readonly fk_contador: number,
    public readonly p_nombre: string,
    public readonly s_nombre: string,
    public readonly p_apellido: string,
    public readonly s_apellido: string,
    public readonly telefono: string,
    //public readonly correo: string,
    //public readonly contrasena: string,
  ) {}
}
