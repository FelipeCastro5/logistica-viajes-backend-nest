export class UpdatePasswordCommand {
  constructor(
    public readonly id: number,
    public readonly contrasena: string,
  ) {}
}
