export class GetConductoresByFilterCommand {
  constructor(
    public readonly filter: string,
    public readonly limit: number,
    public readonly page: number
  ) {}
}
