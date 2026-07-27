import { MercanciaPeligrosa } from './mercancia-peligrosa.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para MercanciaPeligrosaInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface MercanciaPeligrosaInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<MercanciaPeligrosa[]>.
     */
    getAll(): Promise<MercanciaPeligrosa[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<MercanciaPeligrosa | null>.
     */
    getById(id: number): Promise<MercanciaPeligrosa | null>;

  /**
     * Método encargado de ejecutar la operación de createMercanciaPeligrosa.
     * @param fk_remesa El parámetro que recibe información de tipo number.
     * @param codigo_un El parámetro que recibe información de tipo string.
     * @param grupo_riesgo El parámetro que recibe información de tipo string.
     * @param caracteristica_peligrosidad El parámetro que recibe información de tipo string.
     * @param embalaje_envase El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<MercanciaPeligrosa>.
     */
    createMercanciaPeligrosa(
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<MercanciaPeligrosa>;

  /**
     * Método encargado de ejecutar la operación de updateMercanciaPeligrosa.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_remesa El parámetro que recibe información de tipo number.
     * @param codigo_un El parámetro que recibe información de tipo string.
     * @param grupo_riesgo El parámetro que recibe información de tipo string.
     * @param caracteristica_peligrosidad El parámetro que recibe información de tipo string.
     * @param embalaje_envase El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateMercanciaPeligrosa(
    id: number,
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de deleteMercanciaPeligrosa.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteMercanciaPeligrosa(id: number): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de getByRemesa.
     * @param fk_remesa El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<MercanciaPeligrosa[]>.
     */
    getByRemesa(fk_remesa: number): Promise<MercanciaPeligrosa[]>;
}
