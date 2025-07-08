import { Usuario } from './usuario.entity';

export interface UsuarioInterface {
  getAll(): Promise<Usuario[]>;
  getById(id: number): Promise<Usuario | null>;
  createUsuario(usuario: Omit<Usuario, 'id_usuario'>): Promise<Usuario>;
  updateUsuario(id: number, usuario: Omit<Usuario, 'id_usuario'>): Promise<any>;
  deleteUsuario(id: number): Promise<any>;
}
