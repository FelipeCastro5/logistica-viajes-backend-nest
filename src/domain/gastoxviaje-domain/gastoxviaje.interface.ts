import { Gastoxviaje } from './gastoxviaje.entity';

export interface GastoxviajeInterface {
  getAll(): Promise<Gastoxviaje[]>;
  getById(id: number): Promise<Gastoxviaje | null>;
  createGastoxviaje(
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<Gastoxviaje>;
  updateGastoxviaje(
    id: number,
    fk_viaje: number,
    fk_gasto: number,
    valor: number,
    detalles: string
  ): Promise<any>;
  deleteGastoxviaje(id: number): Promise<any>;
  getGastosByViaje(fk: number): Promise<any | null>;
}
