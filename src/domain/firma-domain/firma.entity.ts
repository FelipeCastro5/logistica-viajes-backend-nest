/**
 * Clase de entidad que representa a Firma dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Firma {
  /**
     * Propiedad de la entidad que representa id firma.
     * Contiene un valor de tipo: number.
     */
    id_firma: number;
  /**
     * Propiedad de la entidad que representa fk viaje.
     * Contiene un valor de tipo: number.
     */
    fk_viaje: number;
  /**
     * Propiedad de la entidad que representa tipo firma.
     * Contiene un valor de tipo: string.
     */
    tipo_firma: string;
  /**
     * Propiedad de la entidad que representa firma digital.
     * Contiene un valor de tipo: string.
     */
    firma_digital: string;
  /**
     * Propiedad de la entidad que representa fecha firma.
     * Contiene un valor de tipo: Date.
     */
    fecha_firma: Date;
}
