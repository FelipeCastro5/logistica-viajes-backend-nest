import { Viaje } from './viaje.entity';

export interface ViajeInterface {
  getAll(): Promise<Viaje[]>;
  getById(id: number): Promise<Viaje | null>;
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
    fecha_llegada: Date
  ): Promise<Viaje>;
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
    fecha_llegada: Date
  ): Promise<any>;
  deleteViaje(id: number): Promise<any>;
  getViajesPaginatedByUsuario(id: number, limit: number,offset: number): Promise<any>;
  countViajesByUsuario(id: number): Promise<any>;
  createNewViaje(
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
    //Manifiesto
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
    ganacia_conductor: number
  ): Promise<any>;
}
