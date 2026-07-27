import { Injectable } from '@nestjs/common';
import { AuthInterface } from './auth.interface';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Auth.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class AuthRepository implements AuthInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de login.
     * @param correo Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async login(correo: string): Promise<any | null> {
        const query = this.postgresService.getQuery('login');
        const result = await this.postgresService.query<any>(query, [correo]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de updatePassword.
     * @param id Parámetro de entrada de tipo number.
     * @param contrasena Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updatePassword(id: number, contrasena: string): Promise<any> {
        const query = this.postgresService.getQuery('update-password');
        const params = [contrasena, id];
        return this.postgresService.query<any[]>(query, params);
    }
}
