export class UpdateTipodocCommand {
  constructor(
    public readonly id: number,
    public readonly nombre_documento: string,
    public readonly abreviatura: string,
  ) {}
}
