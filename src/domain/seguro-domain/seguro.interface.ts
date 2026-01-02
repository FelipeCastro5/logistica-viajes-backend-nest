import { Seguro } from './seguro.entity';

export interface SeguroInterface {
  getAll(): Promise<Seguro[]>;
  getById(id: number): Promise<Seguro | null>;
  createSeguro(
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<Seguro>;
  updateSeguro(
    id: number,
    fk_vehiculo: number,
    tipo_seguro: string,
    numero_poliza: string,
    aseguradora: string,
    fecha_vencimiento: Date,
    valor: number,
  ): Promise<any>;
  deleteSeguro(id: number): Promise<any>;
  getSegurosByVehiculo(fk_vehiculo: number): Promise<Seguro[]>;
}
