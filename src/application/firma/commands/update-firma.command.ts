export class UpdateFirmaCommand {
  constructor(
    public readonly id: number,
    public readonly fk_viaje: number,
    public readonly tipo_firma: string,
    public readonly firma_digital: string,
  ) {}
}
