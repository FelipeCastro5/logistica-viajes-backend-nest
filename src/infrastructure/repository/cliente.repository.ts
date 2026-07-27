import { Injectable } from '@nestjs/common';
import { ClienteInterface } from '../../domain/cliente-domain/cliente.interface';
import { Cliente } from '../../domain/cliente-domain/cliente.entity';
import { PostgresService } from '../postgres-db/postgres.service';

/**
 * Implementación concreta del repositorio para Cliente.
 * Se encarga de la persistencia de datos en la base de datos a través de consultas SQL.
 */
@Injectable()
export class ClienteRepository implements ClienteInterface {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly postgresService: PostgresService) {}

  /**
     * Ejecuta la operación técnica de getAll.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getAll(): Promise<Cliente[]> {
        const query = this.postgresService.getQuery('get-all-clientes');
        const result = await this.postgresService.query<Cliente>(query);
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.
        // 2. Retornamos el resultado estructurado hacia la capa de aplicación.

        return result.rows;
    }

  /**
     * Ejecuta la operación técnica de getById.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getById(id: number): Promise<Cliente | null> {
        const query = this.postgresService.getQuery('get-cliente');
        const result = await this.postgresService.query<Cliente>(query, [id]);
        return result.rows[0] || null;
    }

  /**
     * Ejecuta la operación técnica de createCliente.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param nit Parámetro de entrada de tipo string.
     * @param nombre_cliente Parámetro de entrada de tipo string.
     * @param telefono Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de updateCliente.
     * @param id Parámetro de entrada de tipo number.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param nit Parámetro de entrada de tipo string.
     * @param nombre_cliente Parámetro de entrada de tipo string.
     * @param telefono Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de deleteCliente.
     * @param id Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async deleteCliente(id: number): Promise<any> {
        const query = this.postgresService.getQuery('delete-cliente');
        return this.postgresService.query<any[]>(query, [id]);
    }

  /**
     * Ejecuta la operación técnica de getClientesByUsuario.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getClientesByUsuario(fk_usuario: number): Promise<Cliente[]> {
        const query = this.postgresService.getQuery('get-cliente-by-usuario');
        const result = await this.postgresService.query<Cliente>(query, [fk_usuario]);
        return result.rows || null;
    }
}
