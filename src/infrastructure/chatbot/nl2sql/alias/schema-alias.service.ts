import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SchemaAliasService {
  private aliases: Record<string, string[]> = {};

  constructor() {
    const file = path.join(__dirname, 'config', 'schema_aliases.json');
    if (fs.existsSync(file)) {
      this.aliases = JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  }

  getAliases(): Record<string, string[]> {
    return this.aliases;
  }

  getForTable(fullName: string): string[] {
    return this.aliases[fullName] || [];
  }
}
