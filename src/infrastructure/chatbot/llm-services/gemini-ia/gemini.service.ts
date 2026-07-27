import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Clase de infraestructura: GeminiService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
     * Ejecuta la operación técnica de preguntarGemini.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async preguntarGemini(pregunta: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

      const result = await model.generateContent(pregunta);
      const response = await result.response;
      const texto = response.text();

      return texto;
    } catch (error) {
      console.error('❌ Error consultando Gemini:', error);
      throw new Error('Error procesando la consulta con Gemini');
    }
  }
}
