import { Injectable } from '@nestjs/common';
import { LlmAdapter } from '../llm-adapter.interface';
import { GenerateSqlInput } from '../../types/llm-adapter.types';

/**
 * Clase de infraestructura: GeminiAdapter.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class GeminiAdapter implements LlmAdapter {
  private readonly apiKey = process.env.GEMINI_API_KEY;

  /**
     * Ejecuta la operación técnica de generateSQL.
     * @param input Parámetro de entrada de tipo GenerateSqlInput.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async generateSQL(input: GenerateSqlInput) {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY no configurada');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${input.model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: input.prompt }],
            },
          ],
          generationConfig: {
            temperature: input.temperature ?? 0.2,
            maxOutputTokens: input.maxTokens ?? 512,
          },
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini error ${response.status}: ${err}`);
    }

    const json = await response.json();

    return {
      sql: json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '',
      rawResponse: json,
    };
  }
}
