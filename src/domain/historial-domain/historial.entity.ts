/**
 * Clase de entidad que representa a Historial dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Historial {
  /**
     * Propiedad de la entidad que representa id.
     * Contiene un valor de tipo: number.
     */
    id: number;
  /**
     * Propiedad de la entidad que representa fk user.
     * Contiene un valor de tipo: number.
     */
    fk_user: number;
  /**
     * Propiedad de la entidad que representa question.
     * Contiene un valor de tipo: string.
     */
    question: string;
  /**
     * Propiedad de la entidad que representa answer.
     * Contiene un valor de tipo: string.
     */
    answer: string;
  /**
     * Propiedad de la entidad que representa created at.
     * Contiene un valor de tipo: Date.
     */
    created_at: Date;
}
