import { Lugar } from './lugar.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para LugarInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface LugarInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Lugar[]>.
     */
    getAll(): Promise<Lugar[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Lugar | null>.
     */
    getById(id: number): Promise<Lugar | null>;
  /**
     * Método encargado de ejecutar la operación de createLugar.
     * @param nombre_lugar El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Lugar>.
     */
    createLugar(nombre_lugar: string): Promise<Lugar>;
  /**
     * Método encargado de ejecutar la operación de updateLugar.
     * @param id El parámetro que recibe información de tipo number.
     * @param nombre_lugar El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Lugar>.
     */
    updateLugar(id: number, nombre_lugar: string): Promise<Lugar>;
  /**
     * Método encargado de ejecutar la operación de deleteLugar.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteLugar(id: number): Promise<any>;
}
