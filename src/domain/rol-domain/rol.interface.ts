import { Rol } from './rol.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para RolInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface RolInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Rol[]>.
     */
    getAll(): Promise<Rol[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Rol | null>.
     */
    getById(id: number): Promise<Rol | null>;
  /**
     * Método encargado de ejecutar la operación de createRol.
     * @param nombre_rol El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Rol>.
     */
    createRol(nombre_rol: string): Promise<Rol>;
  /**
     * Método encargado de ejecutar la operación de updateRol.
     * @param id El parámetro que recibe información de tipo number.
     * @param nombre_rol El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateRol(id: number, nombre_rol: string): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteRol.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteRol(id: number): Promise<any>;
}
