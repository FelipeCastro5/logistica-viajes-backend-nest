/**
 * Clase de infraestructura: UpdatePasswordCommand.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
export class UpdatePasswordCommand {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    public readonly id: number,
    public readonly contrasena: string,
  ) {}
}
