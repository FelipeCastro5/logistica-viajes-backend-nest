import { Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../domain/viaje-domain/viaje.interface';
import { Viaje } from '../../domain/viaje-domain/viaje.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Viaje.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class ViajeRepository implements ViajeInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Viaje[]> {
        const query = this.postgresService.getQuery('get-all-viajes');
        const result = await this.postgresService.query<Viaje>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Viaje | null> {
        const query = this.postgresService.getQuery('get-viaje');
        const result = await this.postgresService.query<Viaje>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createViaje.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param fk_manifiesto Parámetro de entrada de tipo number.
     * @param fk_cliente Parámetro de entrada de tipo number.
     * @param fk_origen Parámetro de entrada de tipo number.
     * @param fk_destino Parámetro de entrada de tipo number.
     * @param codigo Parámetro de entrada de tipo string.
     * @param observaciones Parámetro de entrada de tipo string.
     * @param estado_viaje Parámetro de entrada de tipo boolean.
     * @param producto Parámetro de entrada de tipo string.
     * @param detalle_producto Parámetro de entrada de tipo string.
     * @param direccion_llegada Parámetro de entrada de tipo string.
     * @param fecha_salida Parámetro de entrada de tipo Date.
     * @param fecha_llegada Parámetro de entrada de tipo Date.
     * @param latitud_origen Parámetro de entrada de tipo number.
     * @param longitud_origen Parámetro de entrada de tipo number.
     * @param latitud_destino Parámetro de entrada de tipo number.
     * @param longitud_destino Parámetro de entrada de tipo number.
     * @param hora_salida Parámetro de entrada de tipo Date.
     * @param hora_llegada Parámetro de entrada de tipo Date.
     * @param horas_pactadas_cargue Parámetro de entrada de tipo number.
     * @param horas_pactadas_descargue Parámetro de entrada de tipo number.
     * @param exoneracion_legal Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
    hora_salida: Date,
    hora_llegada: Date,
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
          hora_salida,
          hora_llegada,
          horas_pactadas_cargue,
          horas_pactadas_descargue,
          exoneracion_legal,
        ];
        const result = await this.postgresService.query<Viaje>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateViaje.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param fk_manifiesto Parámetro de entrada de tipo number.
     * @param fk_cliente Parámetro de entrada de tipo number.
     * @param fk_origen Parámetro de entrada de tipo number.
     * @param fk_destino Parámetro de entrada de tipo number.
     * @param codigo Parámetro de entrada de tipo string.
     * @param observaciones Parámetro de entrada de tipo string.
     * @param estado_viaje Parámetro de entrada de tipo boolean.
     * @param producto Parámetro de entrada de tipo string.
     * @param detalle_producto Parámetro de entrada de tipo string.
     * @param direccion_llegada Parámetro de entrada de tipo string.
     * @param fecha_salida Parámetro de entrada de tipo Date.
     * @param fecha_llegada Parámetro de entrada de tipo Date.
     * @param latitud_origen Parámetro de entrada de tipo number.
     * @param longitud_origen Parámetro de entrada de tipo number.
     * @param latitud_destino Parámetro de entrada de tipo number.
     * @param longitud_destino Parámetro de entrada de tipo number.
     * @param hora_salida Parámetro de entrada de tipo Date.
     * @param hora_llegada Parámetro de entrada de tipo Date.
     * @param horas_pactadas_cargue Parámetro de entrada de tipo number.
     * @param horas_pactadas_descargue Parámetro de entrada de tipo number.
     * @param exoneracion_legal Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
    hora_salida: Date,
    hora_llegada: Date,
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
          hora_salida,
          hora_llegada,
          horas_pactadas_cargue,
          horas_pactadas_descargue,
          exoneracion_legal,
          id,
        ];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteViaje.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteViaje(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-viaje');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getViajesPaginatedByUsuario.
     * @param id Parámetro de entrada de tipo number.
     * @param limit Parámetro de entrada de tipo number.
     * @param offset Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getViajesPaginatedByUsuario(id: number, limit: number, offset: number): Promise<any> {
        const query = this.postgresService.getQuery('get-viajes-paginated-by-usuario');
        const result = await this.postgresService.query<any>(query, [id, limit, offset]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de countViajesByUsuario.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async countViajesByUsuario(id: number): Promise<any> {
        const query = this.postgresService.getQuery('count-viajes-by-usuario');
        const result = await this.postgresService.query<Viaje>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createNewViaje.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param fk_cliente Parámetro de entrada de tipo number.
     * @param fk_origen Parámetro de entrada de tipo number.
     * @param fk_destino Parámetro de entrada de tipo number.
     * @param codigo Parámetro de entrada de tipo string.
     * @param observaciones Parámetro de entrada de tipo string.
     * @param estado_viaje Parámetro de entrada de tipo boolean.
     * @param producto Parámetro de entrada de tipo string.
     * @param detalle_producto Parámetro de entrada de tipo string.
     * @param direccion_llegada Parámetro de entrada de tipo string.
     * @param fecha_salida Parámetro de entrada de tipo Date.
     * @param fecha_llegada Parámetro de entrada de tipo Date.
     * @param latitud_origen Parámetro de entrada de tipo number.
     * @param longitud_origen Parámetro de entrada de tipo number.
     * @param latitud_destino Parámetro de entrada de tipo number.
     * @param longitud_destino Parámetro de entrada de tipo number.
     * @param hora_salida Parámetro de entrada de tipo Date.
     * @param hora_llegada Parámetro de entrada de tipo Date.
     * @param horas_pactadas_cargue Parámetro de entrada de tipo number.
     * @param horas_pactadas_descargue Parámetro de entrada de tipo number.
     * @param exoneracion_legal Parámetro de entrada de tipo string.
     * @param fk_vehiculo Parámetro de entrada de tipo number.
     * @param flete_total Parámetro de entrada de tipo number.
     * @param porcentaje_retencion_fuente Parámetro de entrada de tipo number.
     * @param valor_retencion_fuente Parámetro de entrada de tipo number.
     * @param porcentaje_ica Parámetro de entrada de tipo number.
     * @param valor_ica Parámetro de entrada de tipo number.
     * @param deduccion_fiscal Parámetro de entrada de tipo number.
     * @param neto_a_pagar Parámetro de entrada de tipo number.
     * @param anticipo Parámetro de entrada de tipo number.
     * @param saldo_a_pagar Parámetro de entrada de tipo number.
     * @param total_gastos Parámetro de entrada de tipo number.
     * @param queda_al_carro Parámetro de entrada de tipo number.
     * @param a_favor_del_carro Parámetro de entrada de tipo number.
     * @param porcentaje_conductor Parámetro de entrada de tipo number.
     * @param ganancia_conductor Parámetro de entrada de tipo number.
     * @param numero_remesa Parámetro de entrada de tipo string.
     * @param numero_autorizacion Parámetro de entrada de tipo string.
     * @param tipo_empaque Parámetro de entrada de tipo string.
     * @param naturaleza_carga Parámetro de entrada de tipo string.
     * @param codigo_armonizado Parámetro de entrada de tipo string.
     * @param cantidad Parámetro de entrada de tipo number.
     * @param unidad_medida Parámetro de entrada de tipo string.
     * @param peso_total Parámetro de entrada de tipo number.
     * @param mercancia_peligrosa Parámetro de entrada de tipo boolean.
     * @param observaciones_remesa Parámetro de entrada de tipo string.
     * @param codigo_un Parámetro de entrada de tipo string.
     * @param grupo_riesgo Parámetro de entrada de tipo string.
     * @param caracteristica_peligrosidad Parámetro de entrada de tipo string.
     * @param embalaje_envase Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createNewViaje(
    fk_usuario: number, fk_cliente: number, fk_origen: number, fk_destino: number, codigo: string,
    observaciones: string, estado_viaje: boolean, producto: string, detalle_producto: string,
    direccion_llegada: string, fecha_salida: Date, fecha_llegada: Date,
    latitud_origen: number,
    longitud_origen: number,
    latitud_destino: number,
    longitud_destino: number,
    hora_salida: Date,
    hora_llegada: Date,
    horas_pactadas_cargue: number,
    horas_pactadas_descargue: number,
    exoneracion_legal: string,
    //Manifiesto
    fk_vehiculo: number,
    flete_total: number, porcentaje_retencion_fuente: number, valor_retencion_fuente: number,
    porcentaje_ica: number, valor_ica: number, deduccion_fiscal: number, neto_a_pagar: number, anticipo: number,
    saldo_a_pagar: number, total_gastos: number, queda_al_carro: number, a_favor_del_carro: number,
    porcentaje_conductor: number, ganancia_conductor: number,
    // REMESA
    numero_remesa: string, numero_autorizacion: string, tipo_empaque: string, naturaleza_carga: string,
    codigo_armonizado: string, cantidad: number, unidad_medida: string, peso_total: number,
    mercancia_peligrosa: boolean, observaciones_remesa: string,
    // MERCANCÍA PELIGROSA (OPCIONAL)
    codigo_un?: string,
    grupo_riesgo?: string,
    caracteristica_peligrosidad?: string,
    embalaje_envase?: string
  ): Promise<any> {
        const queryManifiesto = this.postgresService.getQuery('insert-manifiesto');
        const queryViaje = this.postgresService.getQuery('insert-viaje');
        const queryRemesa = this.postgresService.getQuery('insert-remesa');
        const queryMercanciaPeligrosa = this.postgresService.getQuery('insert-mercancia-peligrosa');

        const queries: any[] = [
          {
            name: 'manifiesto',
            query: () => queryManifiesto,
            values: () => [
              fk_vehiculo,
              flete_total,
              porcentaje_retencion_fuente,
              valor_retencion_fuente,
              porcentaje_ica,
              valor_ica,
              deduccion_fiscal,
              neto_a_pagar,
              anticipo,
              saldo_a_pagar,
              total_gastos,
              queda_al_carro,
              a_favor_del_carro,
              porcentaje_conductor,
              ganancia_conductor,
            ],
          },
          {
            name: 'viaje',
            query: () => queryViaje,
            values: (results) => [
              fk_usuario, results.manifiesto.rows[0].id_manifiesto, fk_cliente, fk_origen,
              fk_destino, codigo, observaciones, estado_viaje, producto, detalle_producto,
              direccion_llegada, fecha_salida, fecha_llegada, latitud_origen, longitud_origen,
              latitud_destino, longitud_destino, hora_salida, hora_llegada, horas_pactadas_cargue,
              horas_pactadas_descargue, exoneracion_legal,
            ],
          },
          {
            name: 'remesa',
            query: () => queryRemesa,
            values: (results) => [
              results.viaje.rows[0].id_viaje, numero_remesa, numero_autorizacion, tipo_empaque,
              naturaleza_carga, codigo_armonizado, cantidad, unidad_medida, peso_total,
              mercancia_peligrosa, observaciones_remesa,
            ],
          },
        ];

        // 👇 OPCIONAL
        if (mercancia_peligrosa) {
          queries.push({
            name: 'mercancia_peligrosa',
            query: () => queryMercanciaPeligrosa,
            values: (results) => [
              results.remesa.rows[0].id_remesa,
              codigo_un,
              grupo_riesgo,
              caracteristica_peligrosidad,
              embalaje_envase,
            ],
          });
        }

        const results = await this.postgresService.queryWithTransactionDynamicArguments(queries);

        return {
          viaje: results.viaje.rows[0],
          remesa: results.remesa.rows[0],
          mercancia_peligrosa: results.mercancia_peligrosa?.rows[0] ?? null,
        };
    }
}
