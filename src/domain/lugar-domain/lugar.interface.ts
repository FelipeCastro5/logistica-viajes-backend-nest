import { Lugar } from './lugar.entity';

export interface LugarInterface {
  getAll(): Promise<Lugar[]>;
  getById(id: number): Promise<Lugar | null>;
  createLugar(nombre_lugar: string): Promise<Lugar>;
  updateLugar(id: number, nombre_lugar: string): Promise<Lugar>;
  deleteLugar(id: number): Promise<any>;
}
