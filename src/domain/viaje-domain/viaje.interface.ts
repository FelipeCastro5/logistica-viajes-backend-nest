import { Viaje } from './viaje.entity';

/**
 * Interfaz que define el contrato de métodos y operaciones para ViajeInterface.
 * Las clases que implementen esta interfaz deberán proveer la lógica descrita.
 */
export interface ViajeInterface {
  /**
     * Método encargado de ejecutar la operación de getAll.
     * @returns Una promesa que resuelve en Promise<Viaje[]>.
     */
    getAll(): Promise<Viaje[]>;
  /**
     * Método encargado de ejecutar la operación de getById.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<Viaje | null>.
     */
    getById(id: number): Promise<Viaje | null>;
  /**
     * Método encargado de ejecutar la operación de createViaje.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @param fk_manifiesto El parámetro que recibe información de tipo number.
     * @param fk_cliente El parámetro que recibe información de tipo number.
     * @param fk_origen El parámetro que recibe información de tipo number.
     * @param fk_destino El parámetro que recibe información de tipo number.
     * @param codigo El parámetro que recibe información de tipo string.
     * @param observaciones El parámetro que recibe información de tipo string.
     * @param estado_viaje El parámetro que recibe información de tipo boolean.
     * @param producto El parámetro que recibe información de tipo string.
     * @param detalle_producto El parámetro que recibe información de tipo string.
     * @param direccion_llegada El parámetro que recibe información de tipo string.
     * @param fecha_salida El parámetro que recibe información de tipo Date.
     * @param fecha_llegada El parámetro que recibe información de tipo Date.
     * @param latitud_origen El parámetro que recibe información de tipo number.
     * @param longitud_origen El parámetro que recibe información de tipo number.
     * @param latitud_destino El parámetro que recibe información de tipo number.
     * @param longitud_destino El parámetro que recibe información de tipo number.
     * @param hora_salida El parámetro que recibe información de tipo Date.
     * @param hora_llegada El parámetro que recibe información de tipo Date.
     * @param horas_pactadas_cargue El parámetro que recibe información de tipo number.
     * @param horas_pactadas_descargue El parámetro que recibe información de tipo number.
     * @param exoneracion_legal El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<Viaje>.
     */
    createViaje(
    fk_usuario: number,
    fk_manifiesto: number,
    fk_cliente: number,
    fk_origen: number,
    fk_destino: number,
    codigo: string,
    observaciones: string,
    estado_viaje: boolean,
    producto: string,
    detalle_producto: string,
    direccion_llegada: string,
    fecha_salida: Date,
    fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    hora_salida: Date,
    hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string
  ): Promise<Viaje>;

  /**
     * Método encargado de ejecutar la operación de updateViaje.
     * @param id El parámetro que recibe información de tipo number.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @param fk_manifiesto El parámetro que recibe información de tipo number.
     * @param fk_cliente El parámetro que recibe información de tipo number.
     * @param fk_origen El parámetro que recibe información de tipo number.
     * @param fk_destino El parámetro que recibe información de tipo number.
     * @param codigo El parámetro que recibe información de tipo string.
     * @param observaciones El parámetro que recibe información de tipo string.
     * @param estado_viaje El parámetro que recibe información de tipo boolean.
     * @param producto El parámetro que recibe información de tipo string.
     * @param detalle_producto El parámetro que recibe información de tipo string.
     * @param direccion_llegada El parámetro que recibe información de tipo string.
     * @param fecha_salida El parámetro que recibe información de tipo Date.
     * @param fecha_llegada El parámetro que recibe información de tipo Date.
     * @param latitud_origen El parámetro que recibe información de tipo number.
     * @param longitud_origen El parámetro que recibe información de tipo number.
     * @param latitud_destino El parámetro que recibe información de tipo number.
     * @param longitud_destino El parámetro que recibe información de tipo number.
     * @param hora_salida El parámetro que recibe información de tipo Date.
     * @param hora_llegada El parámetro que recibe información de tipo Date.
     * @param horas_pactadas_cargue El parámetro que recibe información de tipo number.
     * @param horas_pactadas_descargue El parámetro que recibe información de tipo number.
     * @param exoneracion_legal El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    updateViaje(
    id: number,
    fk_usuario: number,
    fk_manifiesto: number,
    fk_cliente: number,
    fk_origen: number,
    fk_destino: number,
    codigo: string,
    observaciones: string,
    estado_viaje: boolean,
    producto: string,
    detalle_producto: string,
    direccion_llegada: string,
    fecha_salida: Date,
    fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    hora_salida: Date,
    hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string
  ): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de deleteViaje.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    deleteViaje(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de getViajesPaginatedByUsuario.
     * @param id El parámetro que recibe información de tipo number.
     * @param limit El parámetro que recibe información de tipo number.
     * @param offset El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    getViajesPaginatedByUsuario(id: number, limit: number, offset: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de countViajesByUsuario.
     * @param id El parámetro que recibe información de tipo number.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    countViajesByUsuario(id: number): Promise<any>;
  /**
     * Método encargado de ejecutar la operación de createNewViaje.
     * @param fk_usuario El parámetro que recibe información de tipo number.
     * @param fk_cliente El parámetro que recibe información de tipo number.
     * @param fk_origen El parámetro que recibe información de tipo number.
     * @param fk_destino El parámetro que recibe información de tipo number.
     * @param codigo El parámetro que recibe información de tipo string.
     * @param observaciones El parámetro que recibe información de tipo string.
     * @param estado_viaje El parámetro que recibe información de tipo boolean.
     * @param producto El parámetro que recibe información de tipo string.
     * @param detalle_producto El parámetro que recibe información de tipo string.
     * @param direccion_llegada El parámetro que recibe información de tipo string.
     * @param fecha_salida El parámetro que recibe información de tipo Date.
     * @param fecha_llegada El parámetro que recibe información de tipo Date.
     * @param latitud_origen El parámetro que recibe información de tipo number.
     * @param longitud_origen El parámetro que recibe información de tipo number.
     * @param latitud_destino El parámetro que recibe información de tipo number.
     * @param longitud_destino El parámetro que recibe información de tipo number.
     * @param hora_salida El parámetro que recibe información de tipo Date.
     * @param hora_llegada El parámetro que recibe información de tipo Date.
     * @param horas_pactadas_cargue El parámetro que recibe información de tipo number.
     * @param horas_pactadas_descargue El parámetro que recibe información de tipo number.
     * @param exoneracion_legal El parámetro que recibe información de tipo string.
     * @param fk_vehiculo El parámetro que recibe información de tipo number.
     * @param flete_total El parámetro que recibe información de tipo number.
     * @param porcentaje_retencion_fuente El parámetro que recibe información de tipo number.
     * @param valor_retencion_fuente El parámetro que recibe información de tipo number.
     * @param porcentaje_ica El parámetro que recibe información de tipo number.
     * @param valor_ica El parámetro que recibe información de tipo number.
     * @param deduccion_fiscal El parámetro que recibe información de tipo number.
     * @param neto_a_pagar El parámetro que recibe información de tipo number.
     * @param anticipo El parámetro que recibe información de tipo number.
     * @param saldo_a_pagar El parámetro que recibe información de tipo number.
     * @param total_gastos El parámetro que recibe información de tipo number.
     * @param queda_al_carro El parámetro que recibe información de tipo number.
     * @param a_favor_del_carro El parámetro que recibe información de tipo number.
     * @param porcentaje_conductor El parámetro que recibe información de tipo number.
     * @param ganancia_conductor El parámetro que recibe información de tipo number.
     * @param numero_remesa El parámetro que recibe información de tipo string.
     * @param numero_autorizacion El parámetro que recibe información de tipo string.
     * @param tipo_empaque El parámetro que recibe información de tipo string.
     * @param naturaleza_carga El parámetro que recibe información de tipo string.
     * @param codigo_armonizado El parámetro que recibe información de tipo string.
     * @param cantidad El parámetro que recibe información de tipo number.
     * @param unidad_medida El parámetro que recibe información de tipo string.
     * @param peso_total El parámetro que recibe información de tipo number.
     * @param mercancia_peligrosa El parámetro que recibe información de tipo boolean.
     * @param observaciones_remesa El parámetro que recibe información de tipo string.
     * @param codigo_un El parámetro que recibe información de tipo string.
     * @param grupo_riesgo El parámetro que recibe información de tipo string.
     * @param caracteristica_peligrosidad El parámetro que recibe información de tipo string.
     * @param embalaje_envase El parámetro que recibe información de tipo string.
     * @returns Una promesa que resuelve en Promise<any>.
     */
    createNewViaje(
    //viaje
    fk_usuario: number,
    fk_cliente: number,
    fk_origen: number,
    fk_destino: number,
    codigo: string,
    observaciones: string,
    estado_viaje: boolean,
    producto: string,
    detalle_producto: string,
    direccion_llegada: string,
    fecha_salida: Date,
    fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    hora_salida: Date,
    hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string,
    // Manifiesto
    fk_vehiculo: number,
    flete_total: number,
    porcentaje_retencion_fuente: number,
    valor_retencion_fuente: number,
    porcentaje_ica: number,
    valor_ica: number,
    deduccion_fiscal: number,
    neto_a_pagar: number,
    anticipo: number,
    saldo_a_pagar: number,
    total_gastos: number,
    queda_al_carro: number,
    a_favor_del_carro: number,
    porcentaje_conductor: number,
    ganancia_conductor: number,
    // Remesa
    numero_remesa: string,
    numero_autorizacion: string,
    tipo_empaque: string,
    naturaleza_carga: string,
    codigo_armonizado: string,
    cantidad: number,
    unidad_medida: string,
    peso_total: number,
    mercancia_peligrosa: boolean,
    observaciones_remesa: string,
    // Datos mercancía peligrosa (opcionales)
    codigo_un?: string,
    grupo_riesgo?: string,
    caracteristica_peligrosidad?: string,
    embalaje_envase?: string
  ): Promise<any>;

}
