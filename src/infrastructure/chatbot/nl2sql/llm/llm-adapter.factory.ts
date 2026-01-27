import { Injectable } from '@nestjs/common';
import { OpenAIAdapter } from './adapters/openai.adapter';
import { GeminiAdapter } from './adapters/gemini.adapter';
import { DeepSeekAdapter } from './adapters/deepseek.adapter';
import { LlmAdapter } from './llm-adapter.interface';
import { LlmProvider } from './llm-config.service';

@Injectable()
export class LlmAdapterFactory {
  constructor(
    private readonly openai: OpenAIAdapter,
    private readonly gemini: GeminiAdapter,
    private readonly deepseek: DeepSeekAdapter,
  ) {}

  getAdapter(provider: LlmProvider): LlmAdapter {
    switch (provider) {
      case 'openai':
        return this.openai;
      case 'gemini':
        return this.gemini;
      case 'deepseek':
        return this.deepseek;
      default:
        throw new Error(`Proveedor no soportado: ${provider}`);
    }
  }
}
