import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OpenRouterService } from './openrouter.service';

/**
 * Clase de infraestructura: OpenRouterController.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@ApiTags('OpenRouter')
@Controller('openrouter')
export class OpenRouterController {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly openRouterService: OpenRouterService) {}

  /**
     * Ejecuta la operación técnica de preguntar.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Post('ask')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pregunta: {
          type: 'string',
          example: 'Genera un SQL para obtener las ventas del último mes',
        },
      },
    },
  })
  async preguntar(@Body('pregunta') pregunta: string) {
    const respuesta = await this.openRouterService.preguntar(pregunta);
    return { pregunta, respuesta };
  }
}
