import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlPostprocessService {
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
