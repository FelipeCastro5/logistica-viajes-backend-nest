export class UpdateMensajeCommand {
  constructor(
    public readonly id: number,
    public readonly fk_chat: number,
    public readonly pregunta: string,
    public readonly respuesta: string
  ) {}
}
