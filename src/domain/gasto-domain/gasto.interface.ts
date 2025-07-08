import { Gasto } from './gasto.entity';

export interface GastoInterface {
  getAll(): Promise<Gasto[]>;
  getById(id: number): Promise<Gasto | null>;
  createGasto(nombre_gasto: string): Promise<Gasto>;
  updateGasto(id: number, nombre_gasto: string): Promise<any>;
  deleteGasto(id: number): Promise<any>;
}
