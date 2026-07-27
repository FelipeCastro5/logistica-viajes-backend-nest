import { Gasto } from './gasto.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para GastoInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface GastoInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Gasto[]>.
     */
    getAll(): Promise<Gasto[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Gasto | null>.
     */
    getById(id: number): Promise<Gasto | null>;
  /**
     * Método encargado de ejecutar la operación de createGasto.
     * @param nombre_gasto El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Gasto>.
     */
    createGasto(nombre_gasto: string): Promise<Gasto>;
  /**
     * Método encargado de ejecutar la operación de updateGasto.
     * @param id El parámetro que recibe información de tipo number.
     * @param nombre_gasto El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateGasto(id: number, nombre_gasto: string): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteGasto.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteGasto(id: number): Promise<any>;
}
