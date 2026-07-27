import { Injectable } from '@nestjs/common';

/**
 * Clase de infraestructura: SqlPostprocessService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class SqlPostprocessService {
  /**
     * Ejecuta la operación técnica de process.
     * @param sql Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    process(sql: string): { sql: string; warnings: string[] } {
    let cleaned = sql;
    const warnings: string[] = [];

    // ```sql ... ```
    if (cleaned.includes('```')) {
      cleaned = cleaned.replace(/```sql|```/gi, '').trim();
      warnings.push('Se removieron fences de markdown');
    }

    // backticks
    if (cleaned.includes('`')) {
      cleaned = cleaned.replace(/`/g, '');
      warnings.push('Se removieron backticks');
    }

    // punto y coma final
    if (cleaned.endsWith(';')) {
      cleaned = cleaned.slice(0, -1);
      warnings.push('Se removió punto y coma final');
    }

    return {
      sql: cleaned.trim(),
      warnings,
    };
  }
}
