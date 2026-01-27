import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OpenAIService } from './openai.service';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

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
    const respuesta = await this.openaiService.preguntarOpenAI(pregunta);
    return { pregunta, respuesta };
  }
}
