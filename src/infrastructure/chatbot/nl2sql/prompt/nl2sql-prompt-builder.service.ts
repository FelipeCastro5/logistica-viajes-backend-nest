import { Injectable } from '@nestjs/common';

interface PromptBuilderInput {
  question: string;
  schemaDigest: any;
  ranking?: {
    tokens?: string[];
    spatialIntent?: boolean;
    chosen?: string[];
    spatialJoinHints?: [string, string][];
  };
  context?: {
    bbox?: [number, number, number, number];
    filters?: Record<string, any>;
  };
}

@Injectable()
export class Nl2sqlPromptBuilder {
  build(input: PromptBuilderInput): { prompt: string } {
    const {
      question,
      schemaDigest,
      ranking,
      context,
    } = input;

    const rules = this.buildRules(ranking);
    const schema = this.buildSchemaSection(schemaDigest);
    const userQuestion = this.buildQuestion(question, context);

    const prompt = `
Eres un generador de SQL para PostgreSQL${this.isSpatial(schemaDigest) ? ' con PostGIS' : ''}.

${rules}

=== ESQUEMA DISPONIBLE ===
${schema}

=== CONSULTA DEL USUARIO ===
${userQuestion}

=== INSTRUCCIONES FINALES ===
- Devuelve SOLO SQL válido
- No agregues explicaciones
- No uses tablas ni columnas que no estén en el esquema
- Usa siempre el nombre completo: schema.tabla
- Termina sin punto y coma
`;

    return { prompt: prompt.trim() };
  }

  // =====================
  // Reglas
  // =====================

  private buildRules(ranking?: PromptBuilderInput['ranking']): string {
    const rules: string[] = [
      '- Usa exclusivamente SELECT',
      '- No uses DELETE, UPDATE, INSERT, DROP, ALTER, TRUNCATE ni COPY',
      '- No inventes tablas ni columnas',
      '- Usa JOIN solo cuando sea necesario',
    ];

    if (ranking?.spatialIntent) {
      rules.push(
        '- La consulta es espacial',
        '- Usa funciones PostGIS cuando corresponda (ST_Intersects, ST_Within, ST_Distance)',
        '- Si devuelves geometría, usa ST_AsGeoJSON(columna)',
      );
    }

    if (ranking?.chosen?.length) {
      rules.push(
        `- Prioriza las siguientes tablas: ${ranking.chosen.join(', ')}`,
      );
    }

    if (ranking?.spatialJoinHints?.length) {
      for (const [a, b] of ranking.spatialJoinHints) {
        rules.push(
          `- Es posible un JOIN espacial entre ${a} y ${b}`,
        );
      }
    }

    return rules.join('\n');
  }

  // =====================
  // Esquema
  // =====================

  private buildSchemaSection(schemaDigest: any): string {
    const lines: string[] = [];

    for (const [fullName, table] of Object.entries(schemaDigest.tables)) {
      lines.push(`Tabla ${fullName}:`);

      for (const [col, type] of Object.entries(
        (table as any).columns,
      )) {
        lines.push(`  - ${col}: ${type}`);
      }

      if ((table as any).primaryKey) {
        lines.push(`  PK: ${(table as any).primaryKey}`);
      }

      if ((table as any).foreignKeys?.length) {
        for (const fk of (table as any).foreignKeys) {
          lines.push(
            `  FK: ${fk.column} -> ${fk.references.table}.${fk.references.column}`,
          );
        }
      }

      if ((table as any).geometry) {
        lines.push(
          `  GEOMETRY: ${(table as any).geometry.column} (${(table as any).geometry.type}, SRID ${(table as any).geometry.srid})`,
        );
      }

      lines.push('');
    }

    return lines.join('\n');
  }

  // =====================
  // Pregunta
  // =====================

  private buildQuestion(
    question: string,
    context?: PromptBuilderInput['context'],
  ): string {
    const lines: string[] = [question];

    if (context?.bbox) {
      lines.push(
        `Filtro espacial (bbox): ${context.bbox.join(', ')}`,
      );
    }

    if (context?.filters) {
      lines.push(
        `Filtros adicionales: ${JSON.stringify(context.filters)}`,
      );
    }

    return lines.join('\n');
  }

  // =====================
  // Utils
  // =====================

  private isSpatial(schemaDigest: any): boolean {
    return Object.values(schemaDigest.tables).some(
      (t: any) => Boolean(t.geometry),
    );
  }
}
