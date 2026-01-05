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
    fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    fecha_hora_salida: Date,
    fecha_hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string
  ): Promise<Viaje> {
    const query = this.postgresService.getQuery('insert-viaje');
    const params = [
      fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
      codigo, observaciones, estado_viaje, producto, detalle_producto,
      direccion_llegada, fecha_salida, fecha_llegada,
      latitud_origen,
      longitud_origen,
      latitud_destino,
      longitud_destino,
      fecha_hora_salida,
      fecha_hora_llegada,
      horas_pactadas_cargue,
      horas_pactadas_descargue,
      exoneracion_legal,
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
    fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    fecha_hora_salida: Date,
    fecha_hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-viaje');
    const params = [
      fk_usuario, fk_manifiesto, fk_cliente, fk_origen, fk_destino,
      codigo, observaciones, estado_viaje, producto, detalle_producto,
      direccion_llegada, fecha_salida, fecha_llegada,
      latitud_origen,
      longitud_origen,
      latitud_destino,
      longitud_destino,
      fecha_hora_salida,
      fecha_hora_llegada,
      horas_pactadas_cargue,
      horas_pactadas_descargue,
      exoneracion_legal,
      id,
    ];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteViaje(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-viaje');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getViajesPaginatedByUsuario(id: number, limit: number, offset: number): Promise<any> {
    const query = this.postgresService.getQuery('get-viajes-paginated-by-usuario');
    const result = await this.postgresService.query<any>(query, [id, limit, offset]);
    return result.rows;
  }

  async countViajesByUsuario(id: number): Promise<any> {
    const query = this.postgresService.getQuery('count-viajes-by-usuario');
    const result = await this.postgresService.query<Viaje>(query, [id]);
    return result.rows[0] || null;
  }

  async createNewViaje(
    fk_usuario: number, fk_cliente: number, fk_origen: number, fk_destino: number, codigo: string,
    observaciones: string, estado_viaje: boolean, producto: string, detalle_producto: string,
    direccion_llegada: string, fecha_salida: Date, fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    fecha_hora_salida: Date,
    fecha_hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string,
    //Manifiesto
    fk_vehiculo: number,
    flete_total: number, porcentaje_retencion_fuente: number, valor_retencion_fuente: number,
    porcentaje_ica: number, valor_ica: number, deduccion_fiscal: number, neto_a_pagar: number, anticipo: number,
    saldo_a_pagar: number, total_gastos: number, queda_al_carro: number, a_favor_del_carro: number,
    porcentaje_conductor: number, ganancia_conductor: number
  ): Promise<any> {
    const queryManifiesto = this.postgresService.getQuery('insert-manifiesto');
    const queryViaje = this.postgresService.getQuery('insert-viaje');

    const results = await this.postgresService.queryWithTransactionDynamicArguments<any>([
      {
        name: 'manifiesto',
        query: () => queryManifiesto,
        values: () => [
          fk_vehiculo,
          flete_total, porcentaje_retencion_fuente, valor_retencion_fuente, porcentaje_ica, valor_ica,
          deduccion_fiscal, neto_a_pagar, anticipo, saldo_a_pagar, total_gastos, queda_al_carro,
          a_favor_del_carro, porcentaje_conductor, ganancia_conductor,
        ],
      },
      {
        name: 'viaje',
        query: () => queryViaje,
        values: (results) => {
          const manifiestoId = results.manifiesto.rows[0].id_manifiesto; // o el campo correcto del RETURNING *
          return [
            fk_usuario, manifiestoId, fk_cliente, fk_origen, fk_destino, codigo, observaciones, estado_viaje,
            producto, detalle_producto, direccion_llegada, fecha_salida, fecha_llegada,
            latitud_origen,
            longitud_origen,
            latitud_destino,
            longitud_destino,
            fecha_hora_salida,
            fecha_hora_llegada,
            horas_pactadas_cargue,
            horas_pactadas_descargue,
            exoneracion_legal,
          ];
        },
      },
    ]);

    return results.viaje.rows[0];
  }

}
