import { Remesa } from './remesa.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para RemesaInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface RemesaInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Remesa[]>.
     */
    getAll(): Promise<Remesa[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Remesa | null>.
     */
    getById(id: number): Promise<Remesa | null>;

  /**
     * Método encargado de ejecutar la operación de createRemesa.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param numero_remesa El parámetro que recibe información de tipo string.
     * @param numero_autorizacion El parámetro que recibe información de tipo string.
     * @param tipo_empaque El parámetro que recibe información de tipo string.
     * @param naturaleza_carga El parámetro que recibe información de tipo string.
     * @param codigo_armonizado El parámetro que recibe información de tipo string.
     * @param cantidad El parámetro que recibe información de tipo number.
     * @param unidad_medida El parámetro que recibe información de tipo string.
     * @param peso_total El parámetro que recibe información de tipo number.
     * @param mercancia_peligrosa El parámetro que recibe información de tipo boolean.
     * @param observaciones El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Remesa>.
     */
    createRemesa(
    fk_viaje: number,
    numero_remesa: string,
    numero_autorizacion: string,
    tipo_empaque: string,
    naturaleza_carga: string,
    codigo_armonizado: string,
    cantidad: number,
    unidad_medida: string,
    peso_total: number,
    mercancia_peligrosa: boolean,
    observaciones: string,
  ): Promise<Remesa>;

  /**
     * Método encargado de ejecutar la operación de updateRemesa.
     * @param id_remesa El parámetro que recibe información de tipo number.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @param numero_remesa El parámetro que recibe información de tipo string.
     * @param numero_autorizacion El parámetro que recibe información de tipo string.
     * @param tipo_empaque El parámetro que recibe información de tipo string.
     * @param naturaleza_carga El parámetro que recibe información de tipo string.
     * @param codigo_armonizado El parámetro que recibe información de tipo string.
     * @param cantidad El parámetro que recibe información de tipo number.
     * @param unidad_medida El parámetro que recibe información de tipo string.
     * @param peso_total El parámetro que recibe información de tipo number.
     * @param mercancia_peligrosa El parámetro que recibe información de tipo boolean.
     * @param observaciones El parámetro que recibe información de tipo string.
     * @param id_mercancia El parámetro que recibe información de tipo number.
     * @param codigo_un El parámetro que recibe información de tipo string.
     * @param grupo_riesgo El parámetro que recibe información de tipo string.
     * @param caracteristica_peligrosidad El parámetro que recibe información de tipo string.
     * @param embalaje_envase El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateRemesa(
    id_remesa: number,
    fk_viaje: number,
    numero_remesa: string,
    numero_autorizacion: string,
    tipo_empaque: string,
    naturaleza_carga: string,
    codigo_armonizado: string,
    cantidad: number,
    unidad_medida: string,
    peso_total: number,
    mercancia_peligrosa: boolean,
    observaciones: string,
    
    id_mercancia: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de deleteRemesa.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteRemesa(id: number): Promise<any>;

  /**
     * Método encargado de ejecutar la operación de getRemesasByViaje.
     * @param fk_viaje El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Remesa[]>.
     */
    getRemesasByViaje(fk_viaje: number): Promise<Remesa[]>;
}
