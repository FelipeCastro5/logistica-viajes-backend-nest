import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OpenRouterService } from './openrouter.service';

@ApiTags('OpenRouter')
@Controller('openrouter')
export class OpenRouterController {
  constructor(private readonly openRouterService: OpenRouterService) {}

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
