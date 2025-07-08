import { Rol } from './rol.entity';

export interface RolInterface {
  getAll(): Promise<Rol[]>;
  getById(id: number): Promise<Rol | null>;
  createRol(nombre_rol: string): Promise<Rol>;
  updateRol(id: number, nombre_rol: string): Promise<any>;
  deleteRol(id: number): Promise<any>;
}
