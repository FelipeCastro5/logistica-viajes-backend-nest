import { Vehiculo } from './vehiculo.entity';

export interface VehiculoInterface {
  getAll(): Promise<Vehiculo[]>;
  getById(id: number): Promise<Vehiculo | null>;
  createVehiculo(
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<Vehiculo>;
  updateVehiculo(
    id: number,
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<any>;
  deleteVehiculo(id: number): Promise<any>;
  getVehiculosByUsuario(fk_usuario: number): Promise<Vehiculo[]>;
}
