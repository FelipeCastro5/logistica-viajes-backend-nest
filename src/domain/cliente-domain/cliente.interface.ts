import { Cliente } from './cliente.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para ClienteInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface ClienteInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Cliente[]>.
     */
    getAll(): Promise<Cliente[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Cliente | null>.
     */
    getById(id: number): Promise<Cliente | null>;
  /**
     * Método encargado de ejecutar la operación de createCliente.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @param nit El parámetro que recibe información de tipo string.
     * @param nombre_cliente El parámetro que recibe información de tipo string.
     * @param telefono El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Cliente>.
     */
    createCliente(
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<Cliente>;
  /**
     * Método encargado de ejecutar la operación de updateCliente.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @param nit El parámetro que recibe información de tipo string.
     * @param nombre_cliente El parámetro que recibe información de tipo string.
     * @param telefono El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateCliente(
    id: number,
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteCliente.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteCliente(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getClientesByUsuario.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Cliente[]>.
     */
    getClientesByUsuario(fk_usuario: number): Promise<Cliente[]>;
}
