/**
 * Clase de entidad que representa a Vehiculo dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Vehiculo {
  /**
     * Propiedad de la entidad que representa id vehiculo.
     * Contiene un valor de tipo: number.
     */
    id_vehiculo: number;
  /**
     * Propiedad de la entidad que representa fk usuario.
     * Contiene un valor de tipo: number | null.
     */
    fk_usuario: number | null;
  /**
     * Propiedad de la entidad que representa placa.
     * Contiene un valor de tipo: string.
     */
    placa: string;
  /**
     * Propiedad de la entidad que representa marca.
     * Contiene un valor de tipo: string.
     */
    marca: string;
  /**
     * Propiedad de la entidad que representa configuracion.
     * Contiene un valor de tipo: string.
     */
    configuracion: string;
  /**
     * Propiedad de la entidad que representa tipo vehiculo.
     * Contiene un valor de tipo: string.
     */
    tipo_vehiculo: string;
  /**
     * Propiedad de la entidad que representa peso vacio.
     * Contiene un valor de tipo: number.
     */
    peso_vacio: number;
  /**
     * Propiedad de la entidad que representa peso remolque.
     * Contiene un valor de tipo: number.
     */
    peso_remolque: number;
}
