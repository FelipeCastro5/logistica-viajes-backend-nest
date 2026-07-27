import { Tipodoc } from './tipodoc.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para TipodocInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface TipodocInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Tipodoc[]>.
     */
    getAll(): Promise<Tipodoc[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Tipodoc | null>.
     */
    getById(id: number): Promise<Tipodoc | null>;
  /**
     * Método encargado de ejecutar la operación de createTipodoc.
     * @param nombre_documento El parámetro que recibe información de tipo string.
     * @param abreviatura El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Tipodoc>.
     */
    createTipodoc(nombre_documento: string, abreviatura: string): Promise<Tipodoc>;
  /**
     * Método encargado de ejecutar la operación de updateTipodoc.
     * @param id El parámetro que recibe información de tipo number.
     * @param nombre_documento El parámetro que recibe información de tipo string.
     * @param abreviatura El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateTipodoc(id: number, nombre_documento: string, abreviatura: string): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteTipodoc.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteTipodoc(id: number): Promise<any>;
}
