/**
 * Clase de entidad que representa a Seguro dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Seguro {
  /**
     * Propiedad de la entidad que representa id seguro.
     * Contiene un valor de tipo: number.
     */
    id_seguro: number;
  /**
     * Propiedad de la entidad que representa fk vehiculo.
     * Contiene un valor de tipo: number.
     */
    fk_vehiculo: number;
  /**
     * Propiedad de la entidad que representa tipo seguro.
     * Contiene un valor de tipo: string.
     */
    tipo_seguro: string;
  /**
     * Propiedad de la entidad que representa numero poliza.
     * Contiene un valor de tipo: string.
     */
    numero_poliza: string;
  /**
     * Propiedad de la entidad que representa aseguradora.
     * Contiene un valor de tipo: string.
     */
    aseguradora: string;
  /**
     * Propiedad de la entidad que representa fecha vencimiento.
     * Contiene un valor de tipo: Date.
     */
    fecha_vencimiento: Date;
  /**
     * Propiedad de la entidad que representa valor.
     * Contiene un valor de tipo: number.
     */
    valor: number;
}
