import { Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../domain/remesa-domain/remesa.interface';
import { Remesa } from '../../domain/remesa-domain/remesa.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Remesa.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class RemesaRepository implements RemesaInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Remesa[]> {
        const query = this.postgresService.getQuery('get-all-remesas');
        const result = await this.postgresService.query<Remesa>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Remesa | null> {
        const query = this.postgresService.getQuery('get-remesa');
        const result = await this.postgresService.query<Remesa>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createRemesa.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param numero_remesa Parámetro de entrada de tipo string.
     * @param numero_autorizacion Parámetro de entrada de tipo string.
     * @param tipo_empaque Parámetro de entrada de tipo string.
     * @param naturaleza_carga Parámetro de entrada de tipo string.
     * @param codigo_armonizado Parámetro de entrada de tipo string.
     * @param cantidad Parámetro de entrada de tipo number.
     * @param unidad_medida Parámetro de entrada de tipo string.
     * @param peso_total Parámetro de entrada de tipo number.
     * @param mercancia_peligrosa Parámetro de entrada de tipo boolean.
     * @param observaciones Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de updateRemesa.
     * @param id_remesa Parámetro de entrada de tipo number.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @param numero_remesa Parámetro de entrada de tipo string.
     * @param numero_autorizacion Parámetro de entrada de tipo string.
     * @param tipo_empaque Parámetro de entrada de tipo string.
     * @param naturaleza_carga Parámetro de entrada de tipo string.
     * @param codigo_armonizado Parámetro de entrada de tipo string.
     * @param cantidad Parámetro de entrada de tipo number.
     * @param unidad_medida Parámetro de entrada de tipo string.
     * @param peso_total Parámetro de entrada de tipo number.
     * @param mercancia_peligrosa Parámetro de entrada de tipo boolean.
     * @param observaciones Parámetro de entrada de tipo string.
     * @param id_mercancia Parámetro de entrada de tipo number | null.
     * @param codigo_un Parámetro de entrada de tipo string.
     * @param grupo_riesgo Parámetro de entrada de tipo string.
     * @param caracteristica_peligrosidad Parámetro de entrada de tipo string.
     * @param embalaje_envase Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateRemesa(
    id_remesa: number,
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
    // Mercancia Peligrosa
    id_mercancia: number | null,
    codigo_un?: string,
    grupo_riesgo?: string,
    caracteristica_peligrosidad?: string,
    embalaje_envase?: string
  ): Promise<any> {
        return this.postgresService.queryWithTransactionDynamicArguments([
          {
            name: 'updateRemesa',
            query: () => this.postgresService.getQuery('update-remesa'),
            values: () => [
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
              id_remesa,
            ],
          },
          {
            name: 'handleMercancia',
            query: () => {
              if (!mercancia_peligrosa) {
                // Caso mercancia_peligrosa = false → eliminar si existe
                return this.postgresService.getQuery('delete-mercancia-peligrosa-by-remesa');
              } else {
                if (id_mercancia) {
                  // Actualizar mercancia existente
                  return this.postgresService.getQuery('update-mercancia-peligrosa');
                } else {
                  // Crear nueva mercancia
                  return this.postgresService.getQuery('insert-mercancia-peligrosa');
                }
              }
            },
            values: () => {
              if (!mercancia_peligrosa) {
                // DELETE solo necesita fk_remesa
                return [id_remesa];
              } else {
                if (id_mercancia) {
                  return [
                    id_remesa,
                    codigo_un,
                    grupo_riesgo,
                    caracteristica_peligrosidad,
                    embalaje_envase,
                    id_mercancia,
                  ];
                } else {
                  return [
                    id_remesa,
                    codigo_un,
                    grupo_riesgo,
                    caracteristica_peligrosidad,
                    embalaje_envase,
                  ];
                }
              }
            },
          },
        ]);
    }

  /**
     * Ejecuta la operación técnica de deleteRemesa.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteRemesa(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-remesa');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getRemesasByViaje.
     * @param fk_viaje Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
              id_mercancia: mercancia?.id_mercancia ?? null,
              fk_remesa: mercancia?.fk_remesa ?? null,
              codigo_un: mercancia?.codigo_un ?? null,
              grupo_riesgo: mercancia?.grupo_riesgo ?? null,
              caracteristica_peligrosidad:
                mercancia?.caracteristica_peligrosidad ?? null,
              embalaje_envase: mercancia?.embalaje_envase ?? null,
            };
          }),
        );

        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.


        return remesas;
    }

}
