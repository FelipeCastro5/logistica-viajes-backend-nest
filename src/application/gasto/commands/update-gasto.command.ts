export class UpdateGastoCommand {
  constructor(
    public readonly id: number,
    public readonly nombre_gasto: string
  ) {}
}
