import { Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../domain/viaje-domain/viaje.interface';
import { Viaje } from '../../domain/viaje-domain/viaje.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class ViajeRepository implements ViajeInterface {
  constructor(private readonly postgresService: PostgresService) { }

  async getAll(): Promise<Viaje[]> {
    const query = this.postgresService.getQuery('get-all-viajes');
    const result = await this.postgresService.query<Viaje>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Viaje | null> {
    const query = this.postgresService.getQuery('get-viaje');
    const result = await this.postgresService.query<Viaje>(query, [id]);
    return result.rows[0] || null;
  }

  async createViaje(
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
  ): Promise<Viaje> {
    const query = this.postgresService.getQuery('insert-viaje');
    const params = [
      fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
      codigo, observaciones, estado_viaje, producto, detalle_producto,
      direccion_llegada, fecha_salida, fecha_llegada
    ];
    const result = await this.postgresService.query<Viaje>(query, params);
    return result.rows[0];
  }

  async updateViaje(
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
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-viaje');
    const params = [
      fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
      codigo, observaciones, estado_viaje, producto, detalle_producto,
      direccion_llegada, fecha_salida, fecha_llegada,
      id
    ];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteViaje(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-viaje');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getViajesPaginatedByUsuario(id: number, limit: number, offset: number): Promise<any> {
    const query = this.postgresService.getQuery('get-viajes-paginated-by-usuario');
    const result = await this.postgresService.query<any>(query, [id,limit,offset]);
    return result.rows;
  }

  async countViajesByUsuario(id: number): Promise<any> {
    const query = this.postgresService.getQuery('count-viajes-by-usuario');
    const result = await this.postgresService.query<Viaje>(query, [id]);
    return result.rows[0] || null;
  }
}
