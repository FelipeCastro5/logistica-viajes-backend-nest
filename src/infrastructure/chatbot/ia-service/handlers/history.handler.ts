import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';
import { ResponseDto } from 'src/application/utilities/response.dto';
import { ResponseUtil } from 'src/application/utilities/response.util';

/**
 * Clase de infraestructura: HistoryHandler.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class HistoryHandler {
  private readonly logger = new Logger(HistoryHandler.name);

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly toolkit: IaToolkitService) { }

  /**
     * Ejecuta la operación técnica de procesarChatSimple.
     * @param fk_user Parámetro de entrada de tipo number.
     * @param fk_chat Parámetro de entrada de tipo number | null.
     * @param nuevaPregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async procesarChatSimple(
    fk_user: number,
    fk_chat: number | null,
    nuevaPregunta: string
  ): Promise<any> {
    let historial = [];
    let contexto: string;
    let respuesta: string;
    let chatId = fk_chat;
    let nuevoTitulo: string | undefined;

    if (fk_chat) {
      // 🔹 Chat existente
      historial = await this.toolkit.obtenerHistorial(fk_chat);
      contexto = this.toolkit.generarPromptConHistorial(historial, nuevaPregunta);
      this.logger.debug('🧠 Prompt enviado a Gemini (chat existente):\n' + contexto);

      respuesta = await this.toolkit.preguntarIACliente(contexto);
    } else {
      // 🔹 Chat nuevo
      contexto = this.toolkit.generarPromptSinHistorial(nuevaPregunta);
      this.logger.debug('🧠 Prompt enviado a Gemini (nuevo chat):\n' + contexto);

      respuesta = await this.toolkit.preguntarIACliente(contexto);
      this.logger.debug('🧠 Respuesta de Gemini (nuevo chat):\n' + respuesta);

      const titulo = this.toolkit.extraerTituloDeRespuesta(respuesta) || 'Nuevo chat';
      nuevoTitulo = titulo;

      const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
      chatId = nuevoChat.id_chat;

      this.logger.log(`📌 Chat creado con título: "${titulo}" y ID: ${chatId}`);
      respuesta = this.toolkit.removerLineaTitulo(respuesta);
    }

    // 🔹 Guardar mensaje y respuesta
    await this.toolkit.guardarPreguntaYRespuesta(chatId, nuevaPregunta, respuesta);

    return ResponseUtil.success(
      {
        respuesta,
        chatId,
        ...(nuevoTitulo && { titulo: nuevoTitulo }), // Solo incluye si se creó uno nuevo
        // otros: {
        //   chatId,
        //   historial: historial.length ? historial : undefined,
        // },
      },
      'Respuesta generada exitosamente'
    );
  }

}
