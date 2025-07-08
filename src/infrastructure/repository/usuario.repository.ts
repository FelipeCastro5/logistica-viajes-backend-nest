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

  async createUsuario(usuario: Omit<Usuario, 'id_usuario'>): Promise<Usuario> {
    const query = this.postgresService.getQuery('insert-usuario');
    const params = [
      usuario.fk_tipodoc, usuario.num_doc, usuario.fk_rol,
      usuario.fk_contador, usuario.p_nombre, usuario.s_nombre,
      usuario.p_apellido, usuario.s_apellido, usuario.telefono,
      usuario.correo, usuario.contrasena
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
}
