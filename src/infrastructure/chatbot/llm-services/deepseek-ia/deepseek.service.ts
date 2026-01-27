import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

interface DeepSeekResponse {
  output_text?: string;
  text?: string;
  choices?: { message?: { content?: string } }[];
}

@Injectable()
export class DeepSeekService {
  private readonly logger = new Logger(DeepSeekService.name);
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly model: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('DEEPSEEK_API_KEY');
    this.apiUrl = this.configService.get<string>('DEEPSEEK_API_URL') || 'https://api.deepseek.com/chat/completions';
    this.model = this.configService.get<string>('DEEPSEEK_MODEL') || 'default';

    if (!this.apiKey) throw new Error('DEEPSEEK_API_KEY no está configurada en .env');
  }

  async preguntarDeepSeek(prompt: string, temperature = 0.2, maxTokens = 512): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: 'Eres un asistente que responde preguntas de SQL.' },
            { role: 'user', content: prompt }
          ],
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`DeepSeek error ${response.status}: ${errorText}`);
        throw new Error(`DeepSeek error ${response.status}: ${errorText}`);
      }

      const data = await response.json() as { choices?: { message?: { content?: string } }[] };
      return data.choices?.[0]?.message?.content?.trim() ?? '';
    } catch (error) {
      this.logger.error('❌ Error consultando DeepSeek:', error);
      throw new Error('Error procesando la consulta con DeepSeek');
    }
  }
}
