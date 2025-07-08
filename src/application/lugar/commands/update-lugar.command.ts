export class UpdateLugarCommand {
  constructor(
    public readonly id: number,
    public readonly nombre_lugar: string
  ) {}
}
