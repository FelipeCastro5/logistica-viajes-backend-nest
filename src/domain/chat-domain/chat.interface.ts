import { Chat } from './chat.entity';

export interface ChatInterface {
  getAll(): Promise<Chat[]>;
  getById(id: number): Promise<Chat | null>;
  createChat(fk_usuario: number, nombre_chat: string): Promise<Chat>;
  updateChat(id: number, fk_usuario: number, nombre_chat: string): Promise<any>;
  deleteChat(id: number): Promise<any>;
}
