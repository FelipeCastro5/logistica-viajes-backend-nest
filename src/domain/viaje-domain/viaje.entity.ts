/**
 * Clase de entidad que representa a Viaje dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Viaje {
  /**
     * Propiedad de la entidad que representa id viaje.
     * Contiene un valor de tipo: number.
     */
    id_viaje: number;
  /**
     * Propiedad de la entidad que representa fk usuario.
     * Contiene un valor de tipo: number.
     */
    fk_usuario: number;
  /**
     * Propiedad de la entidad que representa fk manifiesto.
     * Contiene un valor de tipo: number.
     */
    fk_manifiesto: number;
  /**
     * Propiedad de la entidad que representa fk cliente.
     * Contiene un valor de tipo: number.
     */
    fk_cliente: number;
  /**
     * Propiedad de la entidad que representa fk origen.
     * Contiene un valor de tipo: number.
     */
    fk_origen: number;
  /**
     * Propiedad de la entidad que representa fk destino.
     * Contiene un valor de tipo: number.
     */
    fk_destino: number;
  /**
     * Propiedad de la entidad que representa codigo.
     * Contiene un valor de tipo: string.
     */
    codigo: string;
  /**
     * Propiedad de la entidad que representa observaciones.
     * Contiene un valor de tipo: string.
     */
    observaciones: string;
  /**
     * Propiedad de la entidad que representa estado viaje.
     * Contiene un valor de tipo: boolean.
     */
    estado_viaje: boolean;
  /**
     * Propiedad de la entidad que representa producto.
     * Contiene un valor de tipo: string.
     */
    producto: string;
  /**
     * Propiedad de la entidad que representa detalle producto.
     * Contiene un valor de tipo: string.
     */
    detalle_producto: string;
  /**
     * Propiedad de la entidad que representa direccion llegada.
     * Contiene un valor de tipo: string.
     */
    direccion_llegada: string;
  /**
     * Propiedad de la entidad que representa fecha salida.
     * Contiene un valor de tipo: Date.
     */
    fecha_salida: Date;
  /**
     * Propiedad de la entidad que representa fecha llegada.
     * Contiene un valor de tipo: Date.
     */
    fecha_llegada: Date;

  /**
     * Propiedad de la entidad que representa latitud origen.
     * Contiene un valor de tipo: number.
     */
    latitud_origen: number;
  /**
     * Propiedad de la entidad que representa longitud origen.
     * Contiene un valor de tipo: number.
     */
    longitud_origen: number;
  /**
     * Propiedad de la entidad que representa latitud destino.
     * Contiene un valor de tipo: number.
     */
    latitud_destino: number;
  /**
     * Propiedad de la entidad que representa longitud destino.
     * Contiene un valor de tipo: number.
     */
    longitud_destino: number;

  /**
     * Propiedad de la entidad que representa hora salida.
     * Contiene un valor de tipo: Date.
     */
    hora_salida: Date;
  /**
     * Propiedad de la entidad que representa hora llegada.
     * Contiene un valor de tipo: Date.
     */
    hora_llegada: Date;

  /**
     * Propiedad de la entidad que representa horas pactadas cargue.
     * Contiene un valor de tipo: number.
     */
    horas_pactadas_cargue: number;
  /**
     * Propiedad de la entidad que representa horas pactadas descargue.
     * Contiene un valor de tipo: number.
     */
    horas_pactadas_descargue: number;
  /**
     * Propiedad de la entidad que representa exoneracion legal.
     * Contiene un valor de tipo: string.
     */
    exoneracion_legal: string;
}
