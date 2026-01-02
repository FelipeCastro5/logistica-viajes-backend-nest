export class CreateFirmaCommand {
  constructor(
    public readonly fk_viaje: number,
    public readonly tipo_firma: string,
    public readonly firma_digital: string,
  ) {}
}
