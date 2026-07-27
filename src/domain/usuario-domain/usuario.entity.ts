/**
 * Clase de entidad que representa a Usuario dentro del dominio de la aplicación.
 * Se utiliza para mapear la estructura de datos.
 */
export class Usuario {
  /**
     * Propiedad de la entidad que representa id usuario.
     * Contiene un valor de tipo: number.
     */
    id_usuario: number;
  /**
     * Propiedad de la entidad que representa fk tipodoc.
     * Contiene un valor de tipo: number.
     */
    fk_tipodoc: number;
  /**
     * Propiedad de la entidad que representa num doc.
     * Contiene un valor de tipo: string.
     */
    num_doc: string;
  /**
     * Propiedad de la entidad que representa fk rol.
     * Contiene un valor de tipo: number.
     */
    fk_rol: number;
  /**
     * Propiedad de la entidad que representa fk contador.
     * Contiene un valor de tipo: number.
     */
    fk_contador: number;
  /**
     * Propiedad de la entidad que representa p nombre.
     * Contiene un valor de tipo: string.
     */
    p_nombre: string;
  /**
     * Propiedad de la entidad que representa s nombre.
     * Contiene un valor de tipo: string.
     */
    s_nombre: string;
  /**
     * Propiedad de la entidad que representa p apellido.
     * Contiene un valor de tipo: string.
     */
    p_apellido: string;
  /**
     * Propiedad de la entidad que representa s apellido.
     * Contiene un valor de tipo: string.
     */
    s_apellido: string;
  /**
     * Propiedad de la entidad que representa telefono.
     * Contiene un valor de tipo: string.
     */
    telefono: string;
  /**
     * Propiedad de la entidad que representa correo.
     * Contiene un valor de tipo: string.
     */
    correo: string;
  /**
     * Propiedad de la entidad que representa contrasena.
     * Contiene un valor de tipo: string.
     */
    contrasena: string;
}
