/**
 * Clase de entidad que representa a Mensaje dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Mensaje {
  /**
     * Propiedad de la entidad que representa id mensaje.
     * Contiene un valor de tipo: number.
     */
    id_mensaje: number;
  /**
     * Propiedad de la entidad que representa fk chat.
     * Contiene un valor de tipo: number.
     */
    fk_chat: number;
  /**
     * Propiedad de la entidad que representa pregunta.
     * Contiene un valor de tipo: string.
     */
    pregunta: string;
  /**
     * Propiedad de la entidad que representa respuesta.
     * Contiene un valor de tipo: string.
     */
    respuesta: string;
  /**
     * Propiedad de la entidad que representa fecha.
     * Contiene un valor de tipo: Date.
     */
    fecha: Date;
}
