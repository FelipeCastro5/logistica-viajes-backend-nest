import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase de infraestructura: SchemaAliasService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class SchemaAliasService {
  private aliases: Record<string, string[]> = {};

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor() {
    const file = path.join(__dirname, 'config', 'schema_aliases.json');
    if (fs.existsSync(file)) {
      this.aliases = JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  }

  /**
     * Ejecuta la operación técnica de getAliases.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    getAliases(): Record<string, string[]> {
    return this.aliases;
  }

  /**
     * Ejecuta la operación técnica de getForTable.
     * @param fullName Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    getForTable(fullName: string): string[] {
    return this.aliases[fullName] || [];
  }
}
