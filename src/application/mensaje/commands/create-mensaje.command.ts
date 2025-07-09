export class CreateMensajeCommand {
  constructor(
    public readonly fk_chat: number,
    public readonly pregunta: string,
    public readonly respuesta: string
  ) {}
}
