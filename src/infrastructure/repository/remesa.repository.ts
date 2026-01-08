import { Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../domain/remesa-domain/remesa.interface';
import { Remesa } from '../../domain/remesa-domain/remesa.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class RemesaRepository implements RemesaInterface {
  constructor(private readonly postgresService: PostgresService) { }

  async getAll(): Promise<Remesa[]> {
    const query = this.postgresService.getQuery('get-all-remesas');
    const result = await this.postgresService.query<Remesa>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Remesa | null> {
    const query = this.postgresService.getQuery('get-remesa');
    const result = await this.postgresService.query<Remesa>(query, [id]);
    return result.rows[0] || null;
  }

  async createRemesa(
    fk_viaje: number,
    numero_remesa: string,
    numero_autorizacion: string,
    tipo_empaque: string,
    naturaleza_carga: string,
    codigo_armonizado: string,
    cantidad: number,
    unidad_medida: string,
    peso_total: number,
    mercancia_peligrosa: boolean,
    observaciones: string,
  ): Promise<Remesa> {
    const query = this.postgresService.getQuery('insert-remesa');
    const params = [
      fk_viaje,
      numero_remesa,
      numero_autorizacion,
      tipo_empaque,
      naturaleza_carga,
      codigo_armonizado,
      cantidad,
      unidad_medida,
      peso_total,
      mercancia_peligrosa,
      observaciones,
    ];
    const result = await this.postgresService.query<Remesa>(query, params);
    return result.rows[0];
  }

  async updateRemesa(
    id: number,
    fk_viaje: number,
    numero_remesa: string,
    numero_autorizacion: string,
    tipo_empaque: string,
    naturaleza_carga: string,
    codigo_armonizado: string,
    cantidad: number,
    unidad_medida: string,
    peso_total: number,
    mercancia_peligrosa: boolean,
    observaciones: string,
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-remesa');
    const params = [
      fk_viaje,
      numero_remesa,
      numero_autorizacion,
      tipo_empaque,
      naturaleza_carga,
      codigo_armonizado,
      cantidad,
      unidad_medida,
      peso_total,
      mercancia_peligrosa,
      observaciones,
      id,
    ];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteRemesa(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-remesa');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getRemesasByViaje(fk_viaje: number): Promise<any[]> {
    const queryRemesas = this.postgresService.getQuery('get-remesas-by-viaje');
    const queryMercanciaPeligrosa =
      this.postgresService.getQuery('get-mercancia-peligrosa-by-remesa');

    const result = await this.postgresService.query<any>(queryRemesas, [fk_viaje]);

    if (!result.rows || result.rows.length === 0) {
      return [];
    }

    const remesas = await Promise.all(
      result.rows.map(async (remesa) => {
        let mercancia = null;

        if (remesa.mercancia_peligrosa) {
          const mpResult = await this.postgresService.query<any>(
            queryMercanciaPeligrosa,
            [remesa.id_remesa],
          );
          mercancia = mpResult.rows[0] || null;
        }
        return {
          ...remesa,
          // 🔴 campos planos (NO objeto)
          codigo_un: mercancia?.codigo_un ?? null,
          grupo_riesgo: mercancia?.grupo_riesgo ?? null,
          caracteristica_peligrosidad:
            mercancia?.caracteristica_peligrosidad ?? null,
          embalaje_envase: mercancia?.embalaje_envase ?? null,
        };
      }),
    );

    return remesas;
  }

}
