// src/infrastructure/nl2sql/schema-digest.builder.ts
export function buildSchemaDigest(schema: any) {
  const tables: Record<string, any> = {};

  // 1️⃣ Columnas
  for (const col of schema.columns) {
    const key = `${col.table_schema}.${col.table_name}`;

    if (!tables[key]) {
      tables[key] = {
        schema: col.table_schema,
        name: col.table_name,
        columns: {},
        primaryKey: null,
        foreignKeys: [],
        geometry: null,
      };
    }

    tables[key].columns[col.column_name] = col.data_type;
  }

  // 2️⃣ Primary Keys
  for (const pk of schema.primaryKeys) {
    const key = `${pk.table_schema}.${pk.table_name}`;
    if (tables[key]) {
      tables[key].primaryKey = pk.column_name;
    }
  }

  // 3️⃣ Foreign Keys
  for (const fk of schema.foreignKeys) {
    const source = `${fk.table_schema}.${fk.table_name}`;
    if (tables[source]) {
      tables[source].foreignKeys.push({
        column: fk.column_name,
        references: {
          table: `${fk.foreign_table_schema}.${fk.foreign_table_name}`,
          column: fk.foreign_column_name,
        },
      });
    }
  }

  // 4️⃣ Geometría (PostGIS)
  for (const geom of schema.geometries) {
    const key = `${geom.table_schema}.${geom.table_name}`;
    if (tables[key]) {
      tables[key].geometry = {
        column: geom.column_name,
        type: geom.type,
        srid: geom.srid,
      };
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    tableCount: Object.keys(tables).length,
    tables,
  };
}
