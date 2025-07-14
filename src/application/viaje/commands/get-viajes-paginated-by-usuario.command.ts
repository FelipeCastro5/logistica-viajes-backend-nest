export class GetViajesPaginatedByUsuarioCommand {
  constructor(
    public readonly id_usuario: number,
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}
