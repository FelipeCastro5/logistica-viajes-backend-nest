// create-usuario.command.ts
export class CreateUsuarioCommand {
  constructor(
    public readonly fk_tipodoc: string,
    public readonly num_doc: string,
    public readonly fk_perfil: number,
    public readonly fk_contador: number,
    public readonly p_nombre: string,
    public readonly s_nombre: string,
    public readonly p_apellido: string,
    public readonly s_apellido: string,
    public readonly telefono: string,
    public readonly correo: string,
    public readonly contrasena: string,
  ) {}
}
