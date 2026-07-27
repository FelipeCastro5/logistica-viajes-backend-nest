// postgres.service.ts
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { Client, QueryResult } from 'pg';
import { ConfigPostgresDto } from './config-postgres.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * Clase de infraestructura: PostgresService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class PostgresService implements OnApplicationShutdown, OnModuleInit {
  private readonly _client: Client;
  private readonly _queries: Record<string, string> = {};

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly configService: ConfigService,
  ) {
    const config = configService.get<ConfigPostgresDto>('postgres');
    if (!config) {
      throw new Error('Postgres config not found');
    }
    this._client = new Client({
      user: config.user,
      database: config.database,
      port: config.port,
      host: config.host,
      password: config.password,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
      // family: 6,
    });
    this.connect();
    this.loadQueries();
  }

  /**
     * Ejecuta la operación técnica de connect.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    private connect(): void {
    this._client
      .connect()
      .then(() => {
        console.log(('/** CONNECTED AT POSTGRES NEW SERVICE**/'));
      })
      .catch((err) =>
        console.error('/** ERROR CONNECTED DB: **/', err),
      );
  }

  /**
     * Ejecuta la operación técnica de loadQueries.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    private loadQueries(): void {

    const queriesDir = join(process.cwd(), 'src', 'infrastructure', 'postgres-db', 'queries');

    const loadRecursive = (dir: string): void => {
      const files = readdirSync(dir);

      files.forEach((file) => {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
          loadRecursive(fullPath);
        } else if (file.endsWith('.sql')) {
          const queryName = file.replace('.sql', '');
          this._queries[queryName] = readFileSync(fullPath, 'utf-8');
        }
      });
    };

    loadRecursive(queriesDir);
  }

  /**
     * Ejecuta la operación técnica de getQuery.
     * @param name Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public getQuery(name: string): string {
    const query = this._queries[name];
    console.log(`Buscando query: "${name}"`);

    if (!query) {
      throw new Error(`Query "${name}" not found.`);
    }
    return query;
  }

  public query = async <T>(
    query: string,
    values: any[] = [],
  ): Promise<QueryResult<T>> => {
    try {
      return await this._client.query<T>(query, values);
    } catch (err) {
      console.error('/** ERROR EXECUTING QUERY **/', err);

      // Detecta el código de error de PostgreSQL
      const pgCode = err.code;

      if (pgCode === '23503') {
        // Foreign key violation
        throw new HttpException({
          message: `Violación de llave foránea: ${err.detail}`,
          detail: err.detail,
        }, HttpStatus.CONFLICT);
      }

      if (pgCode === '23505') {
        // Unique constraint violation
        throw new HttpException({
          message: `Registro duplicado (violación de UNIQUE):${err.detail}`,
          detail: err.detail,
        }, HttpStatus.CONFLICT);
      }

      if (pgCode === '23502') {
        // Not null violation
        throw new HttpException({
          message: `Campo requerido no puede ser nulo:${err.detail}`,
          detail: err.detail,
        }, HttpStatus.BAD_REQUEST);
      }

      // Otros errores: 500 por defecto
      throw new HttpException({
        message: 'Error interno en base de datos',
        detail: err.detail || err.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  public queryWithTransaction = async <T>(
    queries: { query: string; values?: any[] }[],
  ): Promise<QueryResult<T>[]> => {
    const client = this._client;
    const results: QueryResult<T>[] = [];

    try {
      await client.query('BEGIN');

      for (const { query, values } of queries) {
        const result = await client.query<T>(query, values || []);
        results.push(result);
      }
      await client.query('COMMIT');
      return results;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('/** ERROR EXECUTING TRANSACTION **/', err);
      throw new Error('Transaction failed');
    }
  };

  public queryWithTransactionDynamicArguments = async <T>(
    queries: {
      name: string;
      query: (results: Record<string, QueryResult<any>>) => string;
      values?: (results: Record<string, QueryResult<any>>) => any[];
    }[],
  ): Promise<Record<string, QueryResult<T>>> => {
    const client = this._client;
    const results: Record<string, QueryResult<T>> = {};

    try {
      await client.query('BEGIN');

      for (const { name, query, values } of queries) {
        const queryText = query(results);
        const queryValues = values ? values(results) : [];
        const result = await client.query<T>(queryText, queryValues);
        results[name] = result;
      }

      await client.query('COMMIT');
      return results;
    } catch (err: any) {
      await client.query('ROLLBACK');
      console.error('/** ERROR EXECUTING TRANSACTION **/', err);

      const pgCode = err.code;

      if (pgCode === '23503') {
        throw new HttpException({
          message: `Violación de llave foránea: ${err.detail}`,
          detail: err.detail,
        }, HttpStatus.CONFLICT);
      }

      if (pgCode === '23505') {
        throw new HttpException({
          message: `Registro duplicado (violación de UNIQUE): ${err.detail}`,
          detail: err.detail,
        }, HttpStatus.CONFLICT);
      }

      if (pgCode === '23502') {
        throw new HttpException({
          message: `Campo requerido no puede ser nulo: ${err.detail}`,
          detail: err.detail,
        }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException({
        message: 'Error interno en base de datos durante transacción',
        detail: err.detail || err.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
     * Ejecuta la operación técnica de onModuleInit.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async onModuleInit() { }

  /**
     * Ejecuta la operación técnica de disconnect.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    private async disconnect(): Promise<void> {
    try {
      await this._client.end();
      console.log(('/** DISCONNECTED FROM POSTGRES **/'));
    } catch (err) {
      console.error('/** ERROR EXECUTING QUERY **/', err);

    }
  }

  /**
     * Ejecuta la operación técnica de onApplicationShutdown.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async onApplicationShutdown(): Promise<void> {
    await this.disconnect();
  }
}