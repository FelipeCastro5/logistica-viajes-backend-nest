/**
 * Clase de infraestructura: loginCommand.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
export class loginCommand {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    public readonly correo: string,
    public readonly contrasena: string,
  ) {}
}
