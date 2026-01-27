import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY no está configurada');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async preguntarOpenAI(pregunta: string): Promise<string> {
    try {
      const model = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';

      const response = await this.openai.responses.create({
        model,
        input: pregunta,
      });

      return response.output_text;
    } catch (error) {
      console.error('❌ Error consultando OpenAI:', error);
      throw new Error('Error procesando la consulta con OpenAI');
    }
  }
}
