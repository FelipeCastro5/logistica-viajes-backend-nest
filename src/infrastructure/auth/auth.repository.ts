import { Injectable } from '@nestjs/common';
import { AuthInterface } from './auth.interface';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class AuthRepository implements AuthInterface {
  constructor(private readonly postgresService: PostgresService) { }

  async login(correo: string): Promise<any | null> {
    const query = this.postgresService.getQuery('login');
    const result = await this.postgresService.query<any>(query, [correo]);
    return result.rows[0] || null;
  }

  async updatePassword(id: number, contrasena: string): Promise<any> {
    const query = this.postgresService.getQuery('update-password');
    const params = [contrasena, id];
    return this.postgresService.query<any[]>(query, params);
  }
}
