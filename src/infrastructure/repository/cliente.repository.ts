import { Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../domain/cliente-domain/cliente.interface';
import { Cliente } from '../../domain/cliente-domain/cliente.entity';
import { PostgresService } from '../postgres-db/postgres.service';

@Injectable()
export class ClienteRepository implements ClienteInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Cliente[]> {
    const query = this.postgresService.getQuery('get-all-clientes');
    const result = await this.postgresService.query<Cliente>(query);
    return result.rows;
  }

  async getById(id: number): Promise<Cliente | null> {
    const query = this.postgresService.getQuery('get-cliente');
    const result = await this.postgresService.query<Cliente>(query, [id]);
    return result.rows[0] || null;
  }

  async createCliente(
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<Cliente> {
    const query = this.postgresService.getQuery('insert-cliente');
    const params = [fk_usuario, nit, nombre_cliente, telefono];
    const result = await this.postgresService.query<Cliente>(query, params);
    return result.rows[0];
  }

  async updateCliente(
    id: number,
    fk_usuario: number,
    nit: string,
    nombre_cliente: string,
    telefono: string
  ): Promise<any> {
    const query = this.postgresService.getQuery('update-cliente');
    const params = [fk_usuario, nit, nombre_cliente, telefono, id];
    return this.postgresService.query<any[]>(query, params);
  }

  async deleteCliente(id: number): Promise<any> {
    const query = this.postgresService.getQuery('delete-cliente');
    return this.postgresService.query<any[]>(query, [id]);
  }

  async getClientesByUsuario(fk_usuario: number): Promise<Cliente[]> {
    const query = this.postgresService.getQuery('get-cliente-by-usuario');
    const result = await this.postgresService.query<Cliente>(query, [fk_usuario]);
    return result.rows;
  }
}
