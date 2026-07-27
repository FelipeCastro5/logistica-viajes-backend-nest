/**
 * Clase de entidad que representa a Remesa dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Remesa {
  /**
     * Propiedad de la entidad que representa id remesa.
     * Contiene un valor de tipo: number.
     */
    id_remesa: number;
  /**
     * Propiedad de la entidad que representa fk viaje.
     * Contiene un valor de tipo: number.
     */
    fk_viaje: number;
  /**
     * Propiedad de la entidad que representa numero remesa.
     * Contiene un valor de tipo: string.
     */
    numero_remesa: string;
  /**
     * Propiedad de la entidad que representa numero autorizacion.
     * Contiene un valor de tipo: string.
     */
    numero_autorizacion: string;
  /**
     * Propiedad de la entidad que representa tipo empaque.
     * Contiene un valor de tipo: string.
     */
    tipo_empaque: string;
  /**
     * Propiedad de la entidad que representa naturaleza carga.
     * Contiene un valor de tipo: string.
     */
    naturaleza_carga: string;
  /**
     * Propiedad de la entidad que representa codigo armonizado.
     * Contiene un valor de tipo: string.
     */
    codigo_armonizado: string;
  /**
     * Propiedad de la entidad que representa cantidad.
     * Contiene un valor de tipo: number.
     */
    cantidad: number;
  /**
     * Propiedad de la entidad que representa unidad medida.
     * Contiene un valor de tipo: string.
     */
    unidad_medida: string;
  /**
     * Propiedad de la entidad que representa peso total.
     * Contiene un valor de tipo: number.
     */
    peso_total: number;
  /**
     * Propiedad de la entidad que representa mercancia peligrosa.
     * Contiene un valor de tipo: boolean.
     */
    mercancia_peligrosa: boolean;
  /**
     * Propiedad de la entidad que representa observaciones.
     * Contiene un valor de tipo: string.
     */
    observaciones: string;
}
