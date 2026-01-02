import { Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../domain/vehiculo-domain/vehiculo.interface';
import { Vehiculo } from '../../domain/vehiculo-domain/vehiculo.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class VehiculoRepository implements VehiculoInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Vehiculo[]> {
    const query = this.postgresService.getQuery('get-all-vehiculos');
    const result = await this.postgresService.query<Vehiculo>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Vehiculo | null> {
    const query = this.postgresService.getQuery('get-vehiculo');
    const result = await this.postgresService.query<Vehiculo>(query, [id]);
    return result.rows[0] || null;
  }

  async createVehiculo(
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<Vehiculo> {
    const query = this.postgresService.getQuery('insert-vehiculo');
    const params = [
      fk_usuario,
      placa,
      marca,
      configuracion,
      tipo_vehiculo,
      peso_vacio,
      peso_remolque,
    ];
    const result = await this.postgresService.query<Vehiculo>(query, params);
    return result.rows[0];
  }

  async updateVehiculo(
    id: number,
    fk_usuario: number | null,
    placa: string,
    marca: string,
    configuracion: string,
    tipo_vehiculo: string,
    peso_vacio: number,
    peso_remolque: number
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-vehiculo');
    const params = [
      fk_usuario,
      placa,
      marca,
      configuracion,
      tipo_vehiculo,
      peso_vacio,
      peso_remolque,
      id,
    ];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteVehiculo(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-vehiculo');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getVehiculosByUsuario(fk_usuario: number): Promise<Vehiculo[]> {
    const query = this.postgresService.getQuery('get-vehiculo-by-usuario');
    const result = await this.postgresService.query<Vehiculo>(query, [fk_usuario]);
    return result.rows || [];
  }
}
