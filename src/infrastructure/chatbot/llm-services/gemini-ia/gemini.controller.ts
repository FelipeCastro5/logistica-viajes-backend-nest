import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { GeminiService } from './gemini.service';

/**
 * Clase de infraestructura: GeminiController.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly geminiService: GeminiService) {}

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
        pregunta: { type: 'string', example: '¿Qué es la inteligencia artificial?' },
      },
    },
  })
  async preguntar(@Body('pregunta') pregunta: string) {
    const respuesta = await this.geminiService.preguntarGemini(pregunta);
    return { pregunta, respuesta };
  }
}
