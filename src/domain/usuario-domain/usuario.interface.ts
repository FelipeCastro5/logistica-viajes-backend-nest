import { Usuario } from './usuario.entity';

export interface UsuarioInterface {
  getAll(): Promise<Usuario[]>;
  getById(id: number): Promise<Usuario | null>;
  createUsuario(
    fk_tipodoc: number, num_doc: string, fk_rol: number, fk_contador: number, p_nombre: string, s_nombre: string,
    p_apellido: string, s_apellido: string, telefono: string, correo: string, contrasena: string
  ): Promise<Usuario>;
  updateUsuario(
    id: number, fk_tipodoc: number, num_doc: string, fk_rol: number, fk_contador: number,
    p_nombre: string, s_nombre: string, p_apellido: string, s_apellido: string, telefono: string
  ): Promise<any>;
  deleteUsuario(id: number): Promise<any>;
  getByCorreo(correo: string): Promise<any | null>;
  findConductorByFilter(filter: string, limit: number, offset: number): Promise<{ data: any[]; total: number; }>;
}
