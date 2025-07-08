import { Injectable } from '@nestjs/common';
import { RolInterface } from '../../domain/rol-domain/rol.interface';
import { Rol } from '../../domain/rol-domain/rol.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class RolRepository implements RolInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Rol[]> {
    const query = this.postgresService.getQuery('get-all-roles');
    const result = await this.postgresService.query<Rol>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Rol | null> {
    const query = this.postgresService.getQuery('get-rol');
    const result = await this.postgresService.query<Rol>(query, [id]);
    return result.rows[0] || null;
  }

  async createRol(nombre_rol: string): Promise<Rol> {
    const query = this.postgresService.getQuery('insert-rol');
    const result = await this.postgresService.query<Rol>(query, [nombre_rol]);
    return result.rows[0];
  }

  async updateRol(id: number, nombre_rol: string): Promise<any> {
    const query = this.postgresService.getQuery('update-rol');
    return this.postgresService.query<any[]>(query, [nombre_rol, id]);
  }

  async deleteRol(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-rol');
    return this.postgresService.query<any[]>(query, [id]);
  }
}
