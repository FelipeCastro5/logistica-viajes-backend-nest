import { Remesa } from './remesa.entity';

export interface RemesaInterface {
  getAll(): Promise<Remesa[]>;
  getById(id: number): Promise<Remesa | null>;

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

  updateRemesa(
    id: number,
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
  ): Promise<any>;

  deleteRemesa(id: number): Promise<any>;

  getRemesasByViaje(fk_viaje: number): Promise<Remesa[]>;
}
