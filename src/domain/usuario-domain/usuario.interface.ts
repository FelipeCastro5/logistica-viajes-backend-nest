import { Usuario } from './usuario.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para UsuarioInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface UsuarioInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Usuario[]>.
     */
    getAll(): Promise<Usuario[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Usuario | null>.
     */
    getById(id: number): Promise<Usuario | null>;
  /**
     * Método encargado de ejecutar la operación de createUsuario.
     * @param fk_tipodoc El parámetro que recibe información de tipo number.
     * @param num_doc El parámetro que recibe información de tipo string.
     * @param fk_rol El parámetro que recibe información de tipo number.
     * @param fk_contador El parámetro que recibe información de tipo number.
     * @param p_nombre El parámetro que recibe información de tipo string.
     * @param s_nombre El parámetro que recibe información de tipo string.
     * @param p_apellido El parámetro que recibe información de tipo string.
     * @param s_apellido El parámetro que recibe información de tipo string.
     * @param telefono El parámetro que recibe información de tipo string.
     * @param correo El parámetro que recibe información de tipo string.
     * @param contrasena El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Usuario>.
     */
    createUsuario(
    fk_tipodoc: number, num_doc: string, fk_rol: number, fk_contador: number, p_nombre: string, s_nombre: string,
    p_apellido: string, s_apellido: string, telefono: string, correo: string, contrasena: string
  ): Promise<Usuario>;
  /**
     * Método encargado de ejecutar la operación de updateUsuario.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_tipodoc El parámetro que recibe información de tipo number.
     * @param num_doc El parámetro que recibe información de tipo string.
     * @param fk_rol El parámetro que recibe información de tipo number.
     * @param fk_contador El parámetro que recibe información de tipo number.
     * @param p_nombre El parámetro que recibe información de tipo string.
     * @param s_nombre El parámetro que recibe información de tipo string.
     * @param p_apellido El parámetro que recibe información de tipo string.
     * @param s_apellido El parámetro que recibe información de tipo string.
     * @param telefono El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateUsuario(
    id: number, fk_tipodoc: number, num_doc: string, fk_rol: number, fk_contador: number,
    p_nombre: string, s_nombre: string, p_apellido: string, s_apellido: string, telefono: string
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteUsuario.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteUsuario(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getByCorreo.
     * @param correo El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any | null>.
     */
    getByCorreo(correo: string): Promise<any | null>;
  /**
     * Método encargado de ejecutar la operación de findConductorByFilter.
     * @param filter El parámetro que recibe información de tipo string.
     * @param limit El parámetro que recibe información de tipo number.
     * @param offset El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<{ data: any[]; total: number; }>.
     */
    findConductorByFilter(filter: string, limit: number, offset: number): Promise<{ data: any[]; total: number; }>;
}
