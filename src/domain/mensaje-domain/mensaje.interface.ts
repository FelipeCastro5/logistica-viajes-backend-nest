import { Mensaje } from './mensaje.entity';

export interface MensajeInterface {
  getAll(): Promise<Mensaje[]>;
  getById(id: number): Promise<Mensaje | null>;
  createMensaje(fk_chat: number, pregunta: string, respuesta: string): Promise<Mensaje>;
  updateMensaje(id: number, fk_chat: number, pregunta: string, respuesta: string): Promise<any>;
  deleteMensaje(id: number): Promise<any>;
  getLastFive(): Promise<Mensaje[]>;
  getLastFiveByChat(fk_chat: number): Promise<Mensaje[]>;
}
