import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

/**
 * Clase de infraestructura: OpenRouterService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class OpenRouterService {
  private client: OpenAI;

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const baseURL = this.configService.get<string>('OPENROUTER_BASE_URL');

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY no está configurada');
    }

    this.client = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost', // opcional
        'X-Title': 'LogisticaViajes',       // opcional
      },
    });
  }

  /**
     * Ejecuta la operación técnica de preguntar.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async preguntar(pregunta: string): Promise<string> {
    try {
      const model =
        this.configService.get<string>('OPENROUTER_MODEL') ??
        'mistralai/devstral-2512:free';

      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente experto en SQL y análisis de datos.',
          },
          {
            role: 'user',
            content: pregunta,
          },
        ],
        temperature: 0,
      });

      return completion.choices[0]?.message?.content ?? '';
    } catch (error) {
      console.error('❌ Error consultando OpenRouter:', error);
      throw new Error('Error procesando la consulta con OpenRouter');
    }
  }
}
