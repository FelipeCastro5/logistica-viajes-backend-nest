// update-usuario.command.ts
export class UpdateUsuarioCommand {
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
