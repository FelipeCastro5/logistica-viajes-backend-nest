export class CreateTipodocCommand {
  constructor(
    public readonly nombre_documento: string,
    public readonly abreviatura: string,
  ) {}
}
