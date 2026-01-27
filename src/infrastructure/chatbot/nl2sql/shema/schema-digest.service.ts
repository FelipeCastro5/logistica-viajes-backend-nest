import { Injectable } from '@nestjs/common';
import { SchemaCacheService } from './schema-cache.service';
import { buildSchemaDigest } from './schema-digest.builder';
import { SchemaAliasService } from '../alias/schema-alias.service';
import { ConfigService } from '@nestjs/config';
import { TableRankerService } from '../ranking/table-ranker.service';

@Injectable()
export class SchemaDigestService {
  constructor(
    private readonly cache: SchemaCacheService,
    private readonly ranker: TableRankerService,
    private readonly aliases: SchemaAliasService,
    private readonly config: ConfigService,
  ) {}

  async getDigest(userQuery: string) {
    const rawSchema = await this.cache.getSchema();
    const fullDigest = buildSchemaDigest(rawSchema);

    const aliasMap = this.aliases.getAliases();

    const ranking = this.ranker.rankTables(userQuery, fullDigest, {
      aliases: aliasMap,
      maxTables: 50, // ranking puede evaluar más; el recorte viene después
    });

    const maxTables = Number(this.config.get('NL2SQL_MAX_TABLES') ?? 8);
    const maxChars = Number(this.config.get('NL2SQL_MAX_CHARS') ?? 12000);

    const chosen = ranking.candidates.slice(0, maxTables);

    const reducedTables: any = {};
    for (const t of chosen) {
      reducedTables[t.fullName] = fullDigest.tables[t.fullName];
    }

    // 🔥 Hard limit por tamaño
    let json = JSON.stringify(reducedTables);
    if (json.length > maxChars) {
      // eliminar columnas largas empezando por las menos relevantes
      for (const t of chosen.reverse()) {
        const table = reducedTables[t.fullName];
        if (!table) continue;

        const cols = Object.keys(table.columns);
        if (cols.length > 2) {
          delete table.columns[cols[cols.length - 1]];
        }

        json = JSON.stringify(reducedTables);
        if (json.length <= maxChars) break;
      }
    }

    return {
      generatedAt: fullDigest.generatedAt,
      tables: reducedTables,
      ranking: {
        tokens: ranking.tokens,
        spatialIntent: ranking.spatialIntent,
        chosen: chosen.map(c => c.fullName),
        spatialJoinHints: ranking.spatialJoinHints,
      },
    };
  }
}
