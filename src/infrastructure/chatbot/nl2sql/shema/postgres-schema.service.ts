import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';

@Injectable()
export class PostgresSchemaService {
    constructor(private readonly db: PostgresService) { }

    async getSchemas() {
        const { rows } = await this.db.query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
    `);
        return rows;
    }

    async getTables() {
        const { rows } = await this.db.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    `);
        return rows;
    }

    async getColumns() {
        const { rows } = await this.db.query(`
      SELECT table_schema, table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      ORDER BY table_schema, table_name, ordinal_position
    `);
        return rows;
    }

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
