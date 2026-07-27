/**
 * Clase de entidad que representa a Gastoxviaje dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Gastoxviaje {
  /**
     * Propiedad de la entidad que representa id gastoxviaje.
     * Contiene un valor de tipo: number.
     */
    id_gastoxviaje: number;
  /**
     * Propiedad de la entidad que representa fk viaje.
     * Contiene un valor de tipo: number.
     */
    fk_viaje: number;
  /**
     * Propiedad de la entidad que representa fk gasto.
     * Contiene un valor de tipo: number.
     */
    fk_gasto: number;
  /**
     * Propiedad de la entidad que representa valor.
     * Contiene un valor de tipo: number.
     */
    valor: number;
  /**
     * Propiedad de la entidad que representa detalles.
     * Contiene un valor de tipo: string.
     */
    detalles: string;
  /**
     * Propiedad de la entidad que representa url factura.
     * Contiene un valor de tipo: string | null.
     */
    url_factura?: string | null;
  /**
     * Propiedad de la entidad que representa id factura.
     * Contiene un valor de tipo: string | null.
     */
    id_factura?: string | null;
}
