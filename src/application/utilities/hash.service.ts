/**
 * Importamos la librería bcrypt para la encriptación de datos sensibles.
 */
import * as bcrypt from 'bcrypt';

/**
 * Clase utilitaria para manejar el hash (encriptación) y verificación de contraseñas.
 */
export class HashService {
  /**
   * Constante estática que define el número de rondas de salting para bcrypt.
   * A mayor número, más segura pero más lenta será la encriptación.
   */
  private static readonly SALT_ROUNDS = 10;

  /**
   * Compara una contraseña en texto plano con un hash existente.
   * 
   * @param password Contraseña sin encriptar ingresada por el usuario.
   * @param hashedPassword Hash guardado en la base de datos.
   * @returns Promesa que devuelve true si coinciden, false si no.
   */
  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    // 1. Utilizamos bcrypt.compare para evaluar de forma segura ambas cadenas.
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Genera un hash seguro a partir de una contraseña en texto plano.
   * 
   * @param password La contraseña que se desea encriptar.
   * @returns Promesa con el string del hash generado.
   */
  static async hash(password: string): Promise<string> {
    // 1. Usamos bcrypt.hash junto a las rondas de salting predefinidas para encriptar.
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }
}
