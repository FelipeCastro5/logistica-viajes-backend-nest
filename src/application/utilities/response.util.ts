import { ResponseDto } from './response.dto';

/**
 * Clase de utilidad/servicio: ResponseUtil.
 * Provee funciones auxiliares reutilizables a nivel de aplicación.
 */
export class ResponseUtil {
  /**
     * Método success: Ejecuta lógica auxiliar.
     * @param data Parámetro de entrada.
     * @param msg Parámetro de entrada.
     * @param status Parámetro de entrada.
     * @returns Resultado de la operación utilitaria.
     */
    static success<T>(
    data: T,
    msg = 'Operación exitosa',
    status = 200,
  ): ResponseDto<T> {
    return new ResponseDto(status, msg, data);
  }

  /**
     * Método error: Ejecuta lógica auxiliar.
     * @param msg Parámetro de entrada.
     * @param status Parámetro de entrada.
     * @returns Resultado de la operación utilitaria.
     */
    static error(msg: string, status = 400): ResponseDto<null> {
    return new ResponseDto(status, msg, null);
  }
}