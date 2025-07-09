export class CreateChatCommand {
  constructor(
    public readonly fk_usuario: number,
    public readonly nombre_chat: string,
  ) {}
}
