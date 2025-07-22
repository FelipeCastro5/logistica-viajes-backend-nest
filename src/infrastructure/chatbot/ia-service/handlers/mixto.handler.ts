import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';

@Injectable()
export class MixtoHandler {
  private readonly logger = new Logger(MixtoHandler.name);

  constructor(private readonly toolkit: IaToolkitService) {}

  async procesarFlujoMixto(fk_chat: number, pregunta: string) {
    try {
      const historial = await this.toolkit.obtenerHistorial(fk_chat);

      const contexto = historial
        .map(item => `Usuario: ${item.pregunta}\nIA: ${item.respuesta}`)
        .join('\n\n');

      const promptSQL = `Tienes el siguiente contexto de conversación con el usuario:

            ${contexto}

            Y el usuario ahora pregunta: "${pregunta}"

            Con base en esto, genera una consulta SQL que permita responder correctamente.
            Utiliza ILIKE para búsquedas insensibles a mayúsculas y comodines % para coincidencias parciales.

            Devuelve solo la consulta SQL sin comentarios ni explicaciones.`;

      const sqlRaw = await this.toolkit['geminiService'].preguntarGemini(promptSQL);
      const sql = sqlRaw.replace(/```sql|```/g, '').trim();

      this.logger.debug(`📌 SQL generado desde flujo mixto:\n${sql}`);

      const datos = await this.toolkit.ejecutarSQL(sql);
      const respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(pregunta, datos);

      await this.toolkit.guardarPreguntaYRespuesta(fk_chat, pregunta, respuesta);

      return { sql, datos, respuesta };
    } catch (error) {
      this.logger.error('❌ Error en procesarFlujoMixto', error);
      throw new Error('Ocurrió un error al procesar la pregunta con IA.');
    }
  }
}
