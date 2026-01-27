import { Injectable } from '@nestjs/common';
import { LlmAdapter } from '../llm-adapter.interface';
import { GenerateSqlInput } from '../../types/llm-adapter.types';

@Injectable()
export class OpenAIAdapter implements LlmAdapter {
  private readonly apiKey = process.env.OPENAI_API_KEY;

  async generateSQL(input: GenerateSqlInput) {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY no configurada');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: input.model,
        temperature: input.temperature ?? 0.2,
        max_tokens: input.maxTokens ?? 512,
        messages: [
          {
            role: 'system',
            content: input.prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI error ${response.status}: ${err}`);
    }

    const json = await response.json();

    return {
      sql: json.choices?.[0]?.message?.content?.trim() ?? '',
      rawResponse: json,
    };
  }
}
