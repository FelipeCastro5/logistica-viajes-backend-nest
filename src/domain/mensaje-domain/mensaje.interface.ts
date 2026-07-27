import { Mensaje } from './mensaje.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para MensajeInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface MensajeInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Mensaje[]>.
     */
    getAll(): Promise<Mensaje[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Mensaje | null>.
     */
    getById(id: number): Promise<Mensaje | null>;
  /**
     * Método encargado de ejecutar la operación de createMensaje.
     * @param fk_chat El parámetro que recibe información de tipo number.
     * @param pregunta El parámetro que recibe información de tipo string.
     * @param respuesta El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Mensaje>.
     */
    createMensaje(fk_chat: number, pregunta: string, respuesta: string): Promise<Mensaje>;
  /**
     * Método encargado de ejecutar la operación de updateMensaje.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_chat El parámetro que recibe información de tipo number.
     * @param pregunta El parámetro que recibe información de tipo string.
     * @param respuesta El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateMensaje(id: number, fk_chat: number, pregunta: string, respuesta: string): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteMensaje.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteMensaje(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getLastFive.
     * @returns Una promesa que resuelve en Promise<Mensaje[]>.
     */
    getLastFive(): Promise<Mensaje[]>;
  /**
     * Método encargado de ejecutar la operación de getLastFiveByChat.
     * @param fk_chat El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Mensaje[]>.
     */
    getLastFiveByChat(fk_chat: number): Promise<Mensaje[]>;
}
