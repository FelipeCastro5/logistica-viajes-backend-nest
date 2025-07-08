export class CreateClienteCommand {
  constructor(
    public readonly fk_usuario: number,
    public readonly nit: string,
    public readonly nombre_cliente: string,
    public readonly telefono: string,
  ) {}
}
