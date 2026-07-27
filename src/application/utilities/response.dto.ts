/**
 * Clase de utilidad/servicio: ResponseDto.
 * Provee funciones auxiliares reutilizables a nivel de aplicación.
 */
export class ResponseDto<T = any> {
  /** Propiedad utilitaria: status. */
    status: number; // Código de estado HTTP
  /** Propiedad utilitaria: msg. */
    msg: string; // Mensaje descriptivo (de éxito o error)
  /** Propiedad utilitaria: data. */
    data: T | null; // Datos en caso de éxito (o null)

  constructor(status: number, msg: string, data: T | null = null) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}
