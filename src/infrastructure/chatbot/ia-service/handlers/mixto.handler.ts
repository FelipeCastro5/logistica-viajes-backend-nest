import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';
import { ResponseUtil } from 'src/application/utilities/response.util';
import { ResponseDto } from 'src/application/utilities/response.dto';

@Injectable()
export class MixtoHandler {
  private readonly logger = new Logger(MixtoHandler.name);

  constructor(private readonly toolkit: IaToolkitService) {}

  async procesarFlujoMixto(
    fk_user: number,
    fk_chat: number | null,
    pregunta: string
  ): Promise<any> {
    try {
      let chatId = fk_chat;
      let respuesta: string;
      let nuevoTitulo: string | undefined;
      let contexto: string;

      // 1️⃣ Generar SQL desde pregunta
      const sql = await this.toolkit.generarSQLDesdePregunta(pregunta, fk_user);
      this.logger.debug('🧾 SQL generado:\n' + sql);

      // 2️⃣ Ejecutar SQL
      const datos = await this.toolkit.ejecutarSQL(sql);
      this.logger.debug('📦 Datos obtenidos:\n' + JSON.stringify(datos));

      // 3️⃣ Preparar el contexto
      if (fk_chat) {
        const historial = await this.toolkit.obtenerHistorial(fk_chat);
        contexto = this.toolkit.generarPromptConHistorial(historial, pregunta);
        this.logger.debug('📚 Contexto con historial:\n' + contexto);
      } else {
        contexto = pregunta; // se usa pregunta directa
      }

      // 4️⃣ Generar respuesta natural al final
      respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(contexto, datos);
      this.logger.debug('💬 Respuesta generada:\n' + respuesta);

      // 5️⃣ Crear chat si no existe
      if (!chatId) {
        const titulo = this.toolkit.extraerTituloDeRespuesta(respuesta) || 'Consulta Mixta';
        nuevoTitulo = titulo;

        const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
        chatId = nuevoChat.id_chat;

        this.logger.log(`📌 Chat creado con título: "${titulo}" y ID: ${chatId}`);
        respuesta = this.toolkit.removerLineaTitulo(respuesta);
      }

      // 6️⃣ Guardar mensaje y respuesta
      await this.toolkit.guardarPreguntaYRespuesta(chatId, pregunta, respuesta);

      // 7️⃣ Respuesta estructurada
      return ResponseUtil.success(
        {
          respuesta,
          chatId,
          ...(nuevoTitulo && { titulo: nuevoTitulo }),
        },
        'Consulta mixta procesada correctamente'
      );

    } catch (error) {
      this.logger.error('❌ Error en flujo mixto', error);
      throw new Error('Error al procesar el flujo mixto IA + BD');
    }
  }
}
