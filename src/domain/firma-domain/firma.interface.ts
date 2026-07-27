import { Firma } from './firma.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para FirmaInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface FirmaInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Firma[]>.
     */
    getAll(): Promise<Firma[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Firma | null>.
     */
    getById(id: number): Promise<Firma | null>;

  /**
     * Método encargado de ejecutar la operación de createFirma.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param tipo_firma El parámetro que recibe información de tipo string.
     * @param firma_digital El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Firma>.
     */
    createFirma(
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<Firma>;

  /**
     * Método encargado de ejecutar la operación de updateFirma.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param tipo_firma El parámetro que recibe información de tipo string.
     * @param firma_digital El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateFirma(
    id: number,
    fk_viaje: number,
    tipo_firma: string,
    firma_digital: string,
  ): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de deleteFirma.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteFirma(id: number): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de getFirmasByViaje.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Firma[]>.
     */
    getFirmasByViaje(fk_viaje: number): Promise<Firma[]>;
}
