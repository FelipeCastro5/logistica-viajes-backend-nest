import { Seguro } from './seguro.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para SeguroInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface SeguroInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Seguro[]>.
     */
    getAll(): Promise<Seguro[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Seguro | null>.
     */
    getById(id: number): Promise<Seguro | null>;
  /**
     * Método encargado de ejecutar la operación de createSeguro.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @param tipo_seguro El parámetro que recibe información de tipo string.
     * @param numero_poliza El parámetro que recibe información de tipo string.
     * @param aseguradora El parámetro que recibe información de tipo string.
     * @param fecha_vencimiento El parámetro que recibe información de tipo Date.
     * @param valor El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Seguro>.
     */
    createSeguro(
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<Seguro>;
  /**
     * Método encargado de ejecutar la operación de updateSeguro.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @param tipo_seguro El parámetro que recibe información de tipo string.
     * @param numero_poliza El parámetro que recibe información de tipo string.
     * @param aseguradora El parámetro que recibe información de tipo string.
     * @param fecha_vencimiento El parámetro que recibe información de tipo Date.
     * @param valor El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateSeguro(
    id: number,
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteSeguro.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteSeguro(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getSegurosByVehiculo.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Seguro[]>.
     */
    getSegurosByVehiculo(fk_vehiculo: number): Promise<Seguro[]>;
}
