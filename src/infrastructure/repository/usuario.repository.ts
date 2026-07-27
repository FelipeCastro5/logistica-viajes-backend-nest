import { Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../domain/usuario-domain/usuario.interface';
import { Usuario } from '../../domain/usuario-domain/usuario.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Usuario.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class UsuarioRepository implements UsuarioInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) { }

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Usuario[]> {
        const query = this.postgresService.getQuery('get-all-usuarios');
        const result = await this.postgresService.query<Usuario>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Usuario | null> {
        const query = this.postgresService.getQuery('get-usuario');
        const result = await this.postgresService.query<Usuario>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createUsuario.
     * @param fk_tipodoc Parámetro de entrada de tipo number.
     * @param num_doc Parámetro de entrada de tipo string.
     * @param fk_rol Parámetro de entrada de tipo number.
     * @param fk_contador Parámetro de entrada de tipo number.
     * @param p_nombre Parámetro de entrada de tipo string.
     * @param s_nombre Parámetro de entrada de tipo string.
     * @param p_apellido Parámetro de entrada de tipo string.
     * @param s_apellido Parámetro de entrada de tipo string.
     * @param telefono Parámetro de entrada de tipo string.
     * @param correo Parámetro de entrada de tipo string.
     * @param contrasena Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async createUsuario(
    fk_tipodoc: number,
    num_doc: string,
    fk_rol: number,
    fk_contador: number,
    p_nombre: string,
    s_nombre: string,
    p_apellido: string,
    s_apellido: string,
    telefono: string,
    correo: string,
    contrasena: string
  ): Promise<Usuario> {
        const query = this.postgresService.getQuery('insert-usuario');
        const params = [
          fk_tipodoc, num_doc, fk_rol, fk_contador,
          p_nombre, s_nombre, p_apellido, s_apellido,
          telefono, correo, contrasena
        ];
        const result = await this.postgresService.query<Usuario>(query, params);
        return result.rows[0];
    }

  /**
     * Ejecuta la operación técnica de updateUsuario.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_tipodoc Parámetro de entrada de tipo number.
     * @param num_doc Parámetro de entrada de tipo string.
     * @param fk_rol Parámetro de entrada de tipo number.
     * @param fk_contador Parámetro de entrada de tipo number.
     * @param p_nombre Parámetro de entrada de tipo string.
     * @param s_nombre Parámetro de entrada de tipo string.
     * @param p_apellido Parámetro de entrada de tipo string.
     * @param s_apellido Parámetro de entrada de tipo string.
     * @param telefono Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async updateUsuario(
    id: number,
    fk_tipodoc: number,
    num_doc: string,
    fk_rol: number,
    fk_contador: number,
    p_nombre: string,
    s_nombre: string,
    p_apellido: string,
    s_apellido: string,
    telefono: string
  ): Promise<any> {
        const query = this.postgresService.getQuery('update-usuario');
        const params = [
          fk_tipodoc, num_doc, fk_rol, fk_contador,
          p_nombre, s_nombre, p_apellido, s_apellido, telefono,
          //correo, contrasena, 
          id
        ];
        return this.postgresService.query<any[]>(query, params);
    }

  /**
     * Ejecuta la operación técnica de deleteUsuario.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteUsuario(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-usuario');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getByCorreo.
     * @param correo Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getByCorreo(correo: string): Promise<any | null> {
        const query = this.postgresService.getQuery('login');
        const result = await this.postgresService.query<any>(query, [correo]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de findConductorByFilter.
     * @param filter Parámetro de entrada de tipo string.
     * @param limit Parámetro de entrada de tipo number.
     * @param offset Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async findConductorByFilter(filter: string, limit: number, offset: number): Promise<{ data: any[]; total: number }> {
        const findQuery = this.postgresService.getQuery('conductores-find-by-filter');
        const countQuery = this.postgresService.getQuery('conductores-count-by-filter');

        type CountResult = { total: string };

        const [dataResult, countResult] = await Promise.all([
          this.postgresService.query(findQuery, [`%${filter}%`, limit, offset]),
          this.postgresService.query<CountResult>(countQuery, [`%${filter}%`]),
        ]);

        const data = dataResult.rows;
        const total = parseInt(countResult.rows[0]?.total || '0', 10);

        return { data, total };
    }
}
