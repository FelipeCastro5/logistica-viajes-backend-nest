export class CreateSeguroCommand {
  constructor(
    public readonly fk_vehiculo: number,
    public readonly tipo_seguro: string,
    public readonly numero_poliza: string,
    public readonly aseguradora: string,
    public readonly fecha_vencimiento: Date,
    public readonly valor: number,
  ) {}
}
