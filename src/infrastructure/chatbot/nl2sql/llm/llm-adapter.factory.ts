import { Injectable } from '@nestjs/common';
import { GeminiAdapter } from './adapters/gemini.adapter';
import { LlmAdapter } from './llm-adapter.interface';
import { LlmProvider } from './llm-config.service';

/**
 * Clase de infraestructura: LlmAdapterFactory.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class LlmAdapterFactory {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly gemini: GeminiAdapter,
  ) {}

  /**
     * Ejecuta la operación técnica de getAdapter.
     * @param provider Parámetro de entrada de tipo LlmProvider.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    getAdapter(provider: LlmProvider): LlmAdapter {
    switch (provider) {
      case 'gemini':
        return this.gemini;
      default:
        throw new Error(`Proveedor no soportado: ${provider}`);
    }
  }
}
