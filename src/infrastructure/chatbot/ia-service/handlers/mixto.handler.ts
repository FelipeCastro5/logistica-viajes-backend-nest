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

      // 1️⃣ Generar SQL desde pregunta
      const sql = await this.toolkit.generarSQLDesdePregunta(pregunta, fk_user);
      this.logger.debug('🧾 SQL generado:\n' + sql);

      // 2️⃣ Ejecutar SQL
      const datos = await this.toolkit.ejecutarSQL(sql);
      this.logger.debug('📦 Datos obtenidos:\n' + JSON.stringify(datos));

      // 3️⃣ Historial si ya hay chat
      if (fk_chat) {
        const historial = await this.toolkit.obtenerHistorial(fk_user);
        const contexto = this.toolkit.generarPromptConHistorial(historial, pregunta);
        this.logger.debug('📚 Prompt con historial:\n' + contexto);

        respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(contexto, datos);
      } else {
        // 4️⃣ Sin historial, usar pregunta directa
        respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(pregunta, datos);
        this.logger.debug('💬 Respuesta sin historial:\n' + respuesta);

        // 5️⃣ Crear nuevo chat
        const titulo = this.toolkit.extraerTituloDeRespuesta(respuesta) || 'Consulta Mixta';
        const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
        chatId = nuevoChat.id_chat;

        this.logger.log(`🆕 Chat creado: "${titulo}" (ID: ${chatId})`);

        // Opcional: limpiar encabezado
        respuesta = this.toolkit.removerLineaTitulo(respuesta);
      }

      // 6️⃣ Guardar interacción
      await this.toolkit.guardarPreguntaYRespuesta(chatId, pregunta, respuesta);

      // 7️⃣ Respuesta unificada
      return ResponseUtil.success(
        {
          respuesta,
          otros: {
            tipo: 'mixto',
            sql,
            datos,
            chatId
          }
        },
        'Consulta mixta procesada correctamente'
      );

    } catch (error) {
      this.logger.error('❌ Error en flujo mixto', error);
      throw new Error('Error al procesar el flujo mixto IA + BD');
    }
  }
}
