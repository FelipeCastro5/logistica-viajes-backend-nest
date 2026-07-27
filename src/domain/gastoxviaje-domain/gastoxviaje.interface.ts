import { Gastoxviaje } from './gastoxviaje.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para GastoxviajeInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface GastoxviajeInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Gastoxviaje[]>.
     */
    getAll(): Promise<Gastoxviaje[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Gastoxviaje | null>.
     */
    getById(id: number): Promise<Gastoxviaje | null>;
  /**
     * Método encargado de ejecutar la operación de createGastoxviaje.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param fk_gasto El parámetro que recibe información de tipo number.
     * @param valor El parámetro que recibe información de tipo number.
     * @param detalles El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Gastoxviaje>.
     */
    createGastoxviaje(
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<Gastoxviaje>;
  /**
     * Método encargado de ejecutar la operación de updateGastoxviaje.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param fk_gasto El parámetro que recibe información de tipo number.
     * @param valor El parámetro que recibe información de tipo number.
     * @param detalles El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateGastoxviaje(
    id: number,
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteGastoxviaje.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteGastoxviaje(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getGastosByViaje.
     * @param fk El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any | null>.
     */
    getGastosByViaje(fk: number): Promise<any | null>;
  /**
     * Método encargado de ejecutar la operación de updateGastoxviajeFactura.
     * @param id El parámetro que recibe información de tipo number.
     * @param urlFactura El parámetro que recibe información de tipo string.
     * @param idFactura El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateGastoxviajeFactura(id: number, urlFactura: string, idFactura: string): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de clearGastoxviajeFactura.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    clearGastoxviajeFactura(id: number): Promise<any>;
}
