import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeepSeekService } from './deepseek.service';

@ApiTags('DeepSeek')
@Controller('deepseek')
export class DeepSeekController {
  constructor(private readonly deepSeekService: DeepSeekService) {}

  @Post('ask')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pregunta: { type: 'string', example: 'Escribe un resumen sobre IA.' },
      },
    },
  })
  async preguntar(@Body('pregunta') pregunta: string) {
    const respuesta = await this.deepSeekService.preguntarDeepSeek(pregunta);
    return { pregunta, respuesta };
  }
}
