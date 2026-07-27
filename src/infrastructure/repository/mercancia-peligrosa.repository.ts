import { Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { MercanciaPeligrosa } from '../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para MercanciaPeligrosa.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class MercanciaPeligrosaRepository
  implements MercanciaPeligrosaInterface
{
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<MercanciaPeligrosa[]> {
        const query = this.postgresService.getQuery(
          'get-all-mercancia-peligrosa'
        );
        const result =
          await this.postgresService.query<MercanciaPeligrosa>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<MercanciaPeligrosa | null> {
        const query = this.postgresService.getQuery(
          'get-mercancia-peligrosa'
        );
        const result =
          await this.postgresService.query<MercanciaPeligrosa>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createMercanciaPeligrosa.
     * @param fk_remesa Parámetro de entrada de tipo number.
     * @param codigo_un Parámetro de entrada de tipo string.
     * @param grupo_riesgo Parámetro de entrada de tipo string.
     * @param caracteristica_peligrosidad Parámetro de entrada de tipo string.
     * @param embalaje_envase Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createMercanciaPeligrosa(
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<MercanciaPeligrosa> {
        const query = this.postgresService.getQuery(
          'insert-mercancia-peligrosa'
        );
        const params = [
          fk_remesa,
          codigo_un,
          grupo_riesgo,
          caracteristica_peligrosidad,
          embalaje_envase,
        ];
        const result =
          await this.postgresService.query<MercanciaPeligrosa>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateMercanciaPeligrosa.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_remesa Parámetro de entrada de tipo number.
     * @param codigo_un Parámetro de entrada de tipo string.
     * @param grupo_riesgo Parámetro de entrada de tipo string.
     * @param caracteristica_peligrosidad Parámetro de entrada de tipo string.
     * @param embalaje_envase Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateMercanciaPeligrosa(
    id: number,
    fk_remesa: number,
    codigo_un: string,
    grupo_riesgo: string,
    caracteristica_peligrosidad: string,
    embalaje_envase: string
  ): Promise<any> {
        const query = this.postgresService.getQuery(
          'update-mercancia-peligrosa'
        );
        const params = [
          fk_remesa,
          codigo_un,
          grupo_riesgo,
          caracteristica_peligrosidad,
          embalaje_envase,
          id,
        ];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteMercanciaPeligrosa.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteMercanciaPeligrosa(id: number): Promise<any> {
        const query = this.postgresService.getQuery(
          'delete-mercancia-peligrosa'
        );
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getByRemesa.
     * @param fk_remesa Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getByRemesa(fk_remesa: number): Promise<MercanciaPeligrosa[]> {
        const query = this.postgresService.getQuery(
          'get-mercancia-peligrosa-by-remesa'
        );
        const result =
          await this.postgresService.query<MercanciaPeligrosa>(query, [
            fk_remesa,
          ]);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }
}
