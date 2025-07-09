export class CreateGastoXViajeCommand {
  constructor(
    public readonly fk_viaje: number,
    public readonly fk_gasto: number,
    public readonly valor: number,
    public readonly detalles: string,
  ) {}
}
