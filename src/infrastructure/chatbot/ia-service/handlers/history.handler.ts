import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';

@Injectable()
export class HistoryHandler {
  private readonly logger = new Logger(HistoryHandler.name);

  constructor(private readonly toolkit: IaToolkitService) { }

  async procesarChatSimple(
    fk_user: number,
    fk_chat: number | null,
    nuevaPregunta: string
  ): Promise<string> {
    let historial = [];
    let contexto: string;
    let respuesta: string;
    let chatId = fk_chat;

    if (fk_chat) {
      // 🔹 Chat existente
      historial = await this.toolkit.obtenerHistorial(fk_user);
      contexto = this.toolkit.generarPromptConHistorial(historial, nuevaPregunta);
      this.logger.debug('🧠 Prompt enviado a Gemini (chat existente):\n' + contexto);

      respuesta = await this.toolkit.preguntarGemini(contexto);
    } else {
      // 🔹 Chat nuevo
      contexto = this.toolkit.generarPromptSinHistorial(nuevaPregunta);
      this.logger.debug('🧠 Prompt enviado a Gemini (nuevo chat):\n' + contexto);

      respuesta = await this.toolkit.preguntarGemini(contexto);
      this.logger.debug('🧠 Respuesta de Gemini (nuevo chat):\n' + respuesta);

      const titulo = this.toolkit.extraerTituloDeRespuesta(respuesta) || 'Nuevo chat';
      const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
      chatId = nuevoChat.id_chat;

      this.logger.log(`📌 Chat creado con título: "${titulo}" y ID: ${chatId}`);
      // 🔸 Limpiar la respuesta eliminando el título
      respuesta = this.toolkit.removerLineaTitulo(respuesta);
    }

    // 🔹 Guardar mensaje y respuesta
    await this.toolkit.guardarPreguntaYRespuesta(chatId, nuevaPregunta, respuesta);

    return respuesta;
  }

}
