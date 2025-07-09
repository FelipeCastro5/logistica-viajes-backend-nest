export class UpdateChatCommand {
  constructor(
    public readonly id: number,
    public readonly fk_usuario: number,
    public readonly nombre_chat: string,
  ) {}
}
