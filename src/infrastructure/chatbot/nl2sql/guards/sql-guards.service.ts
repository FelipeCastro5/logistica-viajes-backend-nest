import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlGuardsService {
  validate(sql: string): void {
    if (!sql || typeof sql !== 'string') {
      throw new Error('SQL vacío o inválido');
    }

    const normalized = sql.trim().toLowerCase();

    // 🔒 Solo SELECT
    if (!normalized.startsWith('select')) {
      throw new Error('Solo se permiten consultas SELECT');
    }

    // ❌ Múltiples sentencias
    if (this.hasMultipleStatements(normalized)) {
      throw new Error('SQL contiene múltiples sentencias');
    }

    // ❌ Palabras prohibidas
    const forbidden = [
      'drop ',
      'truncate ',
      'alter ',
      'insert ',
      'copy ',
    ];

    for (const word of forbidden) {
      if (normalized.includes(word)) {
        throw new Error(`SQL contiene operación prohibida: ${word.trim()}`);
      }
    }

    // ❌ DELETE sin WHERE
    if (normalized.startsWith('delete') && !normalized.includes(' where ')) {
      throw new Error('DELETE sin WHERE no permitido');
    }

    // ❌ UPDATE sin WHERE
    if (normalized.startsWith('update') && !normalized.includes(' where ')) {
      throw new Error('UPDATE sin WHERE no permitido');
    }

    // ❌ Comentarios SQL
    if (normalized.includes('--') || normalized.includes('/*')) {
      throw new Error('SQL contiene comentarios no permitidos');
    }
  }

  private hasMultipleStatements(sql: string): boolean {
    const semicolons = sql.split(';').filter(s => s.trim().length > 0);
    return semicolons.length > 1;
  }
}
