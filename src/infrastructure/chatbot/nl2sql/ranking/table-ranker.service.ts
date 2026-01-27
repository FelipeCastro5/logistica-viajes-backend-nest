// src/infrastructure/nl2sql/table-ranker.service.ts
import { Injectable } from '@nestjs/common';
import { SchemaAliasService } from '../alias/schema-alias.service';

@Injectable()
export class TableRankerService {
  constructor(
    private readonly aliasService: SchemaAliasService
  ) {}

  /* =======================
     Normalización y tokens
     ======================= */

  private normalizeName(str = ''): string {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/[\s_]+/g, ' ')
      .trim();
  }

  private tokenize(input = ''): string[] {
    return this.normalizeName(input)
      .split(/\s+/)
      .filter(Boolean);
  }

  private buildTokenBigrams(tokens: string[]): string[] {
    const res: string[] = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      res.push(`${tokens[i]} ${tokens[i + 1]}`);
    }
    return res;
  }

  private splitNameIntoWords(name = ''): string[] {
    return this.normalizeName(name).split(/\s+/).filter(Boolean);
  }

  private ngrams(str = '', n = 3): string[] {
    const s = this.normalizeName(str).replace(/\s+/g, '');
    if (s.length < n) return [s];
    const res: string[] = [];
    for (let i = 0; i <= s.length - n; i++) {
      res.push(s.slice(i, i + n));
    }
    return res;
  }

  private overlapCoefficient(aArr: string[], bArr: string[]): number {
    if (!aArr.length || !bArr.length) return 0;
    const a = new Set(aArr);
    const b = new Set(bArr);
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    return inter / Math.min(a.size, b.size);
  }

  /* =======================
     Spatial intent
     ======================= */

  private detectSpatialIntent(text = ''): boolean {
    return /(mapa|ubicacion|latitud|longitud|distancia|cerca de|origen|destino|ruta|trayecto|entre\s+\w+\s+y\s+\w+)/i
      .test(text.toLowerCase());
  }

  /* =======================
     Ranking principal
     ======================= */

  rankTables(
    userInput: string,
    schema: {
      tables: Record<string, {
        columns: Record<string, string>;
        geometry?: { column: string; srid?: number };
      }>;
    },
    options?: {
      maxTables?: number;
      aliasBoost?: number;
      nameTokenBoost?: number;
      columnTokenBoost?: number;
      ngramBoost?: number;
      aliases?: Record<string, string[]>;
    }
  ) {
    const {
      maxTables = 6,
      aliasBoost = 6,
      nameTokenBoost = 1,
      columnTokenBoost = 0.25,
      ngramBoost = 0.5,
      aliases = {},
    } = options || {};

    const tokens = this.tokenize(userInput);
    const bigrams = this.buildTokenBigrams(tokens);
    const allTokens = [...tokens, ...bigrams];

    const spatialIntent = this.detectSpatialIntent(userInput);
    const inputNgrams = this.ngrams(userInput, 3);

    const scored: any[] = [];

    for (const [fullName, meta] of Object.entries(schema.tables)) {
      const [, table] = fullName.split('.');
      const tableWords = this.splitNameIntoWords(table);
      const columns = Object.keys(meta.columns || {});
      const geomColumns = meta.geometry ? [meta.geometry.column] : [];

      let score = 0;
      let hasAliasMatch = false;

      /* 1️⃣ Aliases (SEÑAL FUERTE) */
      const aliasList = (aliases[fullName] || [])
        .map(a => this.normalizeName(a));

      for (const t of allTokens) {
        if (aliasList.includes(this.normalizeName(t))) {
          score += aliasBoost;
          hasAliasMatch = true;
        }
      }

      /* 2️⃣ Tokens vs nombre de tabla */
      for (const t of tokens) {
        const tn = this.normalizeName(t);
        for (const w of tableWords) {
          if (w.includes(tn)) score += nameTokenBoost;
        }
      }

      /* 3️⃣ Tokens vs columnas (ignorando FK/ID) */
      for (const t of tokens) {
        const tn = this.normalizeName(t);
        for (const c of columns) {
          if (/^(id_|fk_)/i.test(c)) continue;
          if (this.normalizeName(c).includes(tn)) {
            score += columnTokenBoost;
          }
        }
      }

      /* 4️⃣ Similaridad por n-grams */
      const tableNgrams = this.ngrams(table, 3);
      score += this.overlapCoefficient(inputNgrams, tableNgrams) * ngramBoost;

      /* 5️⃣ Penalización si no hay alias */
      if (!hasAliasMatch) {
        score -= 1.5;
      }

      scored.push({
        fullName,
        table,
        score,
        columns,
        geomColumns,
      });
    }

    scored.sort((a, b) => b.score - a.score);

    const candidates = scored.slice(0, Math.max(1, maxTables));

    const geomTables = candidates
      .filter(t => t.geomColumns.length > 0)
      .map(t => t.fullName);

    const spatialJoinHints: [string, string][] = [];

    for (let i = 0; i < geomTables.length; i++) {
      for (let j = i + 1; j < geomTables.length; j++) {
        spatialJoinHints.push([geomTables[i], geomTables[j]]);
      }
    }

    return {
      tokens,
      spatialIntent,
      candidates,
      geometryPossibleTables: geomTables,
      spatialJoinHints,
    };
  }
}
