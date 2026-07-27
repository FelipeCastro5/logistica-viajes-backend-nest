import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';

/**
 * Clase de infraestructura: PostgresSchemaService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class PostgresSchemaService {
    /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly db: PostgresService) { }

    /**
     * Ejecuta la operación técnica de getSchemas.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getSchemas() {
        const { rows } = await this.db.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
    `);
        return rows;
    }

    /**
     * Ejecuta la operación técnica de getTables.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getTables() {
        const { rows } = await this.db.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    `);
        return rows;
    }

    /**
     * Ejecuta la operación técnica de getColumns.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getColumns() {
        const { rows } = await this.db.query(`
      SELECT table_schema, table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      ORDER BY table_schema, table_name, ordinal_position
    `);
        return rows;
    }

    /**
     * Ejecuta la operación técnica de getPrimaryKeys.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getPrimaryKeys() {
        const { rows } = await this.db.query(`
      SELECT
        tc.table_schema,
        tc.table_name,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'PRIMARY KEY'
    `);
        return rows;
    }

    /**
     * Ejecuta la operación técnica de getForeignKeys.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getForeignKeys() {
        const { rows } = await this.db.query(`
      SELECT
        tc.table_schema,
        tc.table_name,
        kcu.column_name,
        ccu.table_schema AS foreign_table_schema,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
    `);
        return rows;
    }

    /**
     * Ejecuta la operación técnica de getGeometryColumns.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async getGeometryColumns() {
        try {
            const { rows } = await this.db.query(`
        SELECT
          f_table_schema AS table_schema,
          f_table_name AS table_name,
          f_geometry_column AS column_name,
          type,
          srid
        FROM geometry_columns
      `);
            return rows;
        } catch (e) {
            console.warn('PostGIS not installed, skipping geometry_columns');
            return [];
        }
    }
}
