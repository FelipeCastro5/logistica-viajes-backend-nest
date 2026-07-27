import { Historial } from './historial.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para HistorialInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface HistorialInterface {
  /**
     * Método encargado de ejecutar la operación de insertHistorial.
     * @param fk_user El parámetro que recibe información de tipo number.
     * @param question El parámetro que recibe información de tipo string.
     * @param answer El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Historial>.
     */
    insertHistorial(fk_user: number, question: string, answer: string): Promise<Historial>;
  /**
     * Método encargado de ejecutar la operación de getLastFive.
     * @returns Una promesa que resuelve en Promise<Historial[]>.
     */
    getLastFive(): Promise<Historial[]>;
}
