import { Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../domain/usuario-domain/usuario.interface';
import { Usuario } from '../../domain/usuario-domain/usuario.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class UsuarioRepository implements UsuarioInterface {
  constructor(private readonly postgresService: PostgresService) { }

  async getAll(): Promise<Usuario[]> {
    const query = this.postgresService.getQuery('get-all-usuarios');
    const result = await this.postgresService.query<Usuario>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Usuario | null> {
    const query = this.postgresService.getQuery('get-usuario');
    const result = await this.postgresService.query<Usuario>(query, [id]);
    return result.rows[0] || null;
  }

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

  async deleteUsuario(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-usuario');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getByCorreo(correo: string): Promise<any | null> {
    const query = this.postgresService.getQuery('login');
    const result = await this.postgresService.query<any>(query, [correo]);
    return result.rows[0] || null;
  }

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
