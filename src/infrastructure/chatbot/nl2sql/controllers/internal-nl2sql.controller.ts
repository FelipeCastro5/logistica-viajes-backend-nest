import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/presentation/http/jwt-auth.guard';
import { SchemaCacheService } from '../shema/schema-cache.service';
import { SchemaDigestService } from '../shema/schema-digest.service';
import { buildSchemaDigest } from '../shema/schema-digest.builder';

/**
 * Clase de infraestructura: InternalNl2sqlController.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@ApiTags('NL2SQL Internal')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('internal/nl2sql')
export class InternalNl2sqlController {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly schemaCacheService: SchemaCacheService,
    private readonly digest: SchemaDigestService,
  ) {}

  // ─────────────────────────────────────────────
  // GET /internal/nl2sql/schema-digest
  // ─────────────────────────────────────────────
  /**
     * Ejecuta la operación técnica de getSchemaDigest.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Get('schema-digest')
  @ApiOperation({
    summary: 'Schema digest completo para NL2SQL (uso interno)',
    description:
      'Devuelve el schema completo optimizado para el LLM. Uso admin/dev.',
  })
  @ApiResponse({ status: 200 })
  async getSchemaDigest() {
    const schema = await this.schemaCacheService.getSchema();
    return buildSchemaDigest(schema);
  }

  // ─────────────────────────────────────────────
  // GET /internal/nl2sql/schema-for-query
  // ─────────────────────────────────────────────
  /**
     * Ejecuta la operación técnica de getSchemaForQuery.
     * @param q Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Get('schema-for-query')
  @ApiOperation({
    summary: 'Schema reducido para una consulta NL2SQL',
    description:
      'Aplica ranking semántico de tablas para una pregunta específica.',
  })
  @ApiQuery({
    name: 'q',
    required: true,
    description:
      'Consulta en lenguaje natural (ej: "avaluo promedio por barrio")',
  })
  @ApiResponse({ status: 200 })
  async getSchemaForQuery(@Query('q') q: string) {
    return this.digest.getDigest(q);
  }
}
