import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresSchemaService } from './postgres-schema.service';

interface SchemaCache {
  schemas: string[];
  tables: { schema: string; table: string }[];
  columns: {
    table_schema: string;
    table_name: string;
    column_name: string;
    data_type: string;
    is_nullable: string;
  }[];
  primaryKeys: any[];
  foreignKeys: any[];
  geometries: any[];
  timestamp: number;
}

@Injectable()
export class SchemaCacheService {
  private cache: SchemaCache | null = null;

  constructor(
    private readonly schemaService: PostgresSchemaService,
    private readonly config: ConfigService,
  ) {}

  private get ttlMs(): number {
    const seconds = this.config.get<number>('NL2SQL_CACHE_TTL') ?? 600;
    return seconds * 1000;
  }

  private getAllowedSchemas(): string[] {
    const raw = this.config.get<string>('NL2SQL_ALLOWED_SCHEMAS');
    if (!raw) return [];
    return raw.split(',').map(s => s.trim());
  }

  async getSchema(force = false): Promise<SchemaCache> {
    if (
      !force &&
      this.cache &&
      Date.now() - this.cache.timestamp < this.ttlMs
    ) {
      return this.cache;
    }

    const allowed = this.getAllowedSchemas();

    const schemasRaw = await this.schemaService.getSchemas();
    const schemas = schemasRaw
      .map(s => s.schema_name)
      .filter(s =>
        !['pg_catalog', 'information_schema'].includes(s) &&
        (allowed.length === 0 || allowed.includes(s))
      );

    const tablesRaw = await this.schemaService.getTables();
    const tables = tablesRaw.filter(t => schemas.includes(t.schema));

    const columnsRaw = await this.schemaService.getColumns();
    const columns = columnsRaw.filter(c => schemas.includes(c.table_schema));

    const primaryKeysRaw = await this.schemaService.getPrimaryKeys();
    const primaryKeys = primaryKeysRaw.filter(pk =>
      schemas.includes(pk.table_schema)
    );

    const foreignKeysRaw = await this.schemaService.getForeignKeys();
    const foreignKeys = foreignKeysRaw.filter(fk =>
      schemas.includes(fk.table_schema)
    );

    const geometriesRaw = await this.schemaService.getGeometryColumns();
    const geometries = geometriesRaw.filter(g =>
      schemas.includes(g.table_schema)
    );

    this.cache = {
      schemas,
      tables,
      columns,
      primaryKeys,
      foreignKeys,
      geometries,
      timestamp: Date.now(),
    };

    return this.cache;
  }
}
