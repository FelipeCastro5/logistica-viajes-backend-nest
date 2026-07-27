import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresSchemaService } from './postgres-schema.service';

/**
 * Clase de infraestructura: SchemaIntrospectorService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class SchemaIntrospectorService {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly pg: PostgresSchemaService,
    private readonly config: ConfigService,
  ) {}

  /**
     * Ejecuta la operación técnica de getAllowedSchemas.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    private getAllowedSchemas(): string[] {
    const raw = this.config.get<string>('NL2SQL_ALLOWED_SCHEMAS');
    if (!raw) return [];
    return raw.split(',').map(s => s.trim());
  }

  /**
     * Ejecuta la operación técnica de introspect.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async introspect() {
    const allowed = this.getAllowedSchemas();

    const [
      schemasRaw,
      tablesRaw,
      columnsRaw,
      primaryKeysRaw,
      foreignKeysRaw,
      geometriesRaw
    ] = await Promise.all([
      this.pg.getSchemas(),
      this.pg.getTables(),
      this.pg.getColumns(),
      this.pg.getPrimaryKeys(),
      this.pg.getForeignKeys(),
      this.pg.getGeometryColumns()
    ]);

    const schemas = schemasRaw
      .map(s => s.schema_name)
      .filter(s =>
        !['pg_catalog', 'information_schema'].includes(s) &&
        (allowed.length === 0 || allowed.includes(s))
      );

    return {
      schemas,
      tables: tablesRaw.filter(t => schemas.includes(t.schema)),
      columns: columnsRaw.filter(c => schemas.includes(c.table_schema)),
      primaryKeys: primaryKeysRaw.filter(pk => schemas.includes(pk.table_schema)),
      foreignKeys: foreignKeysRaw.filter(fk => schemas.includes(fk.table_schema)),
      geometries: geometriesRaw.filter(g => schemas.includes(g.table_schema)),
    };
  }
}
