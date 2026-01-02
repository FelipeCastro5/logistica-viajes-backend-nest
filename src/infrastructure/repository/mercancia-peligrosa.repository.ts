import { Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { MercanciaPeligrosa } from '../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class MercanciaPeligrosaRepository
  implements MercanciaPeligrosaInterface
{
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<MercanciaPeligrosa[]> {
    const query = this.postgresService.getQuery(
      'get-all-mercancia-peligrosa'
    );
    const result =
      await this.postgresService.query<MercanciaPeligrosa>(query);
    return result.rows;
  }

  async getById(id: number): Promise<MercanciaPeligrosa | null> {
    const query = this.postgresService.getQuery(
      'get-mercancia-peligrosa'
    );
    const result =
      await this.postgresService.query<MercanciaPeligrosa>(query, [id]);
    return result.rows[0] || null;
  }

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

  async deleteMercanciaPeligrosa(id: number): Promise<any> {
    const query = this.postgresService.getQuery(
      'delete-mercancia-peligrosa'
    );
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getByRemesa(fk_remesa: number): Promise<MercanciaPeligrosa[]> {
    const query = this.postgresService.getQuery(
      'get-mercancia-peligrosa-by-remesa'
    );
    const result =
      await this.postgresService.query<MercanciaPeligrosa>(query, [
        fk_remesa,
      ]);
    return result.rows;
  }
}
