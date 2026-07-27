import { Vehiculo } from './vehiculo.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para VehiculoInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface VehiculoInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Vehiculo[]>.
     */
    getAll(): Promise<Vehiculo[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Vehiculo | null>.
     */
    getById(id: number): Promise<Vehiculo | null>;
  /**
     * Método encargado de ejecutar la operación de createVehiculo.
     * @param fk_usuario El parámetro que recibe información de tipo number | null.
     * @param placa El parámetro que recibe información de tipo string.
     * @param marca El parámetro que recibe información de tipo string.
     * @param configuracion El parámetro que recibe información de tipo string.
     * @param tipo_vehiculo El parámetro que recibe información de tipo string.
     * @param peso_vacio El parámetro que recibe información de tipo number.
     * @param peso_remolque El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Vehiculo>.
     */
    createVehiculo(
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<Vehiculo>;
  /**
     * Método encargado de ejecutar la operación de updateVehiculo.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_usuario El parámetro que recibe información de tipo number | null.
     * @param placa El parámetro que recibe información de tipo string.
     * @param marca El parámetro que recibe información de tipo string.
     * @param configuracion El parámetro que recibe información de tipo string.
     * @param tipo_vehiculo El parámetro que recibe información de tipo string.
     * @param peso_vacio El parámetro que recibe información de tipo number.
     * @param peso_remolque El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateVehiculo(
    id: number,
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteVehiculo.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteVehiculo(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getVehiculosByUsuario.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Vehiculo[]>.
     */
    getVehiculosByUsuario(fk_usuario: number): Promise<Vehiculo[]>;
}
