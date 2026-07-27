/**
 * Clase de entidad que representa a Cliente dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Cliente {
  /**
     * Propiedad de la entidad que representa id cliente.
     * Contiene un valor de tipo: number.
     */
    id_cliente: number;
  /**
     * Propiedad de la entidad que representa fk usuario.
     * Contiene un valor de tipo: number.
     */
    fk_usuario: number;
  /**
     * Propiedad de la entidad que representa nit.
     * Contiene un valor de tipo: string.
     */
    nit: string;
  /**
     * Propiedad de la entidad que representa nombre cliente.
     * Contiene un valor de tipo: string.
     */
    nombre_cliente: string;
  /**
     * Propiedad de la entidad que representa telefono.
     * Contiene un valor de tipo: string.
     */
    telefono: string;
}
