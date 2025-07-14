import { Cliente } from './cliente.entity';

export interface ClienteInterface {
  getAll(): Promise<Cliente[]>;
  getById(id: number): Promise<Cliente | null>;
  createCliente(
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<Cliente>;
  updateCliente(
    id: number,
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<any>;
  deleteCliente(id: number): Promise<any>;
  getClientesByUsuario(fk_usuario: number): Promise<Cliente[]>;
}
