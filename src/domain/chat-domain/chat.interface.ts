/**
 * Importamos la entidad 'Chat' para definir los tipos de retorno o parámetros.
 * Esta entidad representa la estructura base del chat.
 */
import { Chat } from './chat.entity';

/**
 * Interfaz que define el contrato (los métodos) requeridos para el manejo de chats.
 * Cualquier clase (como un repositorio) que implemente esta interfaz debe proporcionar
 * la lógica para estas operaciones.
 */
export interface ChatInterface {
  /**
   * Obtiene todos los chats existentes en el sistema.
   * @returns Una promesa que resuelve en un arreglo de objetos tipo Chat.
   */
  getAll(): Promise<Chat[]>;

  /**
   * Obtiene un chat específico a partir de su identificador único.
   * @param id El identificador único del chat a buscar.
   * @returns Una promesa que resuelve en el Chat si existe, o null si no se encuentra.
   */
  getById(id: number): Promise<Chat | null>;

  /**
   * Crea un nuevo registro de chat.
   * @param fk_usuario El ID del usuario creador o asociado al chat.
   * @param nombre_chat El nombre asignado al nuevo chat.
   * @returns Una promesa que resuelve con la entidad Chat recién creada.
   */
  createChat(fk_usuario: number, nombre_chat: string): Promise<Chat>;

  /**
   * Actualiza los datos de un chat existente.
   * @param id El identificador único del chat a actualizar.
   * @param fk_usuario El nuevo o actual ID de usuario asociado.
   * @param nombre_chat El nuevo nombre para el chat.
   * @returns Una promesa con el resultado de la operación (varía según el ORM/DB).
   */
  updateChat(id: number, fk_usuario: number, nombre_chat: string): Promise<any>;

  /**
   * Elimina un chat de la base de datos (eliminación física o lógica).
   * @param id_chat El identificador único del chat que se desea borrar.
   * @returns Una promesa con el resultado de la operación de eliminación.
   */
  deleteChat(id_chat: number): Promise<any>;
}
