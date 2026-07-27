/**
 * Clase de entidad que representa a MercanciaPeligrosa dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class MercanciaPeligrosa {
  /**
     * Propiedad de la entidad que representa id mercancia.
     * Contiene un valor de tipo: number.
     */
    id_mercancia: number;
  /**
     * Propiedad de la entidad que representa fk remesa.
     * Contiene un valor de tipo: number.
     */
    fk_remesa: number;
  /**
     * Propiedad de la entidad que representa codigo un.
     * Contiene un valor de tipo: string.
     */
    codigo_un: string;
  /**
     * Propiedad de la entidad que representa grupo riesgo.
     * Contiene un valor de tipo: string.
     */
    grupo_riesgo: string;
  /**
     * Propiedad de la entidad que representa caracteristica peligrosidad.
     * Contiene un valor de tipo: string.
     */
    caracteristica_peligrosidad: string;
  /**
     * Propiedad de la entidad que representa embalaje envase.
     * Contiene un valor de tipo: string.
     */
    embalaje_envase: string;
}
