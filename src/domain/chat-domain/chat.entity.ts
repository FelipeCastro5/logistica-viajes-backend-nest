/**
 * Clase que representa la entidad 'Chat' en el dominio de la aplicación.
 * Esta clase se utiliza para mapear la estructura de datos de un chat dentro de la base de datos o lógica de negocio.
 */
export class Chat {
  /**
   * Identificador único del chat.
   * Se utiliza como clave primaria en la base de datos.
   */
  id_chat: number;

  /**
   * Clave foránea que referencia al usuario asociado a este chat.
   * Establece la relación entre un usuario y sus chats correspondientes.
   */
  fk_usuario: number;

  /**
   * Nombre o título asignado al chat.
   * Representa cómo se identificará el chat visualmente.
   */
  nombre_chat: string;

  /**
   * Fecha y hora en la que se creó el chat.
   * Permite llevar un registro cronológico de los chats.
   */
  fecha_creacion: Date;
}
