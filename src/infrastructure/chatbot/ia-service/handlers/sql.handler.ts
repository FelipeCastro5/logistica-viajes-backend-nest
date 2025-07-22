import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';
import { ResponseDto } from 'src/application/utilities/response.dto';
import { ResponseUtil } from 'src/application/utilities/response.util';

@Injectable()
export class SqlHandler {
  private readonly logger = new Logger(SqlHandler.name);

  constructor(private readonly toolkit: IaToolkitService) {}

  async procesarConsultaDb(
    fk_user: number,
    fk_chat: number | null,
    preguntaUsuario: string
  ): Promise<any> {
    try {
      // 1. Generar SQL basado en la pregunta
      const sql = await this.toolkit.generarSQLDesdePregunta(preguntaUsuario, fk_user);
      const datos = await this.toolkit.ejecutarSQL(sql);

      // 2. Generar respuesta en lenguaje natural
      let respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(preguntaUsuario, datos);
      let chatId = fk_chat;

      // 3. Verificar si el chat existe o hay que crearlo
      if (!fk_chat) {
        const titulo = this.toolkit.extraerTituloDeRespuesta(respuesta) || 'Consulta SQL';
        const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
        chatId = nuevoChat.id_chat;

        this.logger.log(`🆕 Chat creado automáticamente: "${titulo}" (ID: ${chatId})`);

        // 🔹 Limpiar respuesta quitando el título
        respuesta = this.toolkit.removerLineaTitulo(respuesta);
      }

      // 4. Guardar mensaje/respuesta en historial
      await this.toolkit.guardarPreguntaYRespuesta(chatId, preguntaUsuario, respuesta);

      // 5️⃣ Retornar respuesta estructurada
      return ResponseUtil.success(
        {
          respuesta,
          otros: {
            sql,
            datos,
            chatId,
          },
        },
        'Consulta SQL procesada correctamente'
      );
    } catch (error) {
      this.logger.error('❌ Error procesando consulta IA + DB', error);
      throw new Error('Error al procesar la consulta con IA y base de datos');
    }
  }
}
