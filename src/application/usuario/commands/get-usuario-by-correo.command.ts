export class GetUsuarioByCorreoCommand {
  constructor(
    public readonly correo: string,
    public readonly contrasena: string,
  ) {}
}
