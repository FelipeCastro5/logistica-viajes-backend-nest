import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';
import { ResponseUtil } from 'src/application/utilities/response.util';

/**
 * Clase de infraestructura: ClasificacionHandler.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class ClasificacionHandler {
  private readonly logger = new Logger(ClasificacionHandler.name);

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly toolkit: IaToolkitService) {}

  /**
     * Ejecuta la operación técnica de procesarPreguntaInteligente.
     * @param fk_user Parámetro de entrada de tipo number.
     * @param fk_chat Parámetro de entrada de tipo number | null.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async procesarPreguntaInteligente(
    fk_user: number,
    fk_chat: number | null,
    pregunta: string
  ): Promise<any> {
    try {
      let chatId = fk_chat;
      let respuesta: string;
      let nuevoTitulo: string | undefined;
      let contexto: string;
      let datos: any = null;
      let sql: string | null = null;

      // 1️⃣ Clasificar tipo de pregunta
      const tipo = await this.toolkit.clasificarTipoDePregunta(pregunta);
      this.logger.debug(`🔍 Tipo clasificado: ${tipo}`);

      // 2️⃣ Obtener historial solo si es "mixto" o "historial"
      if (tipo !== 'sql' && fk_chat) {
        const historial = await this.toolkit.obtenerHistorial(fk_chat);
        contexto = this.toolkit.generarPromptConHistorial(historial, pregunta);
        this.logger.debug('📚 Contexto con historial:\n' + contexto);
      } else {
        contexto = pregunta;
      }

      // 3️⃣ Generar SQL solo si es "sql" o "mixto"
      if (tipo !== 'historial') {
        sql = await this.toolkit.generarSQLDesdePregunta(pregunta, fk_user);
        this.logger.debug('🧾 SQL generado:\n' + sql);

        datos = await this.toolkit.ejecutarSQL(sql);
        this.logger.debug('📦 Datos obtenidos:\n' + JSON.stringify(datos));
      }

      // 4️⃣ Generar respuesta en lenguaje natural (con o sin datos)
      respuesta = await this.toolkit.generarRespuestaEnLenguajeNatural(contexto, datos);
      this.logger.debug('💬 Respuesta generada:\n' + respuesta);

      // 5️⃣ Crear chat si no existe (🔑 NUEVO FLUJO DE TÍTULO)
      if (!chatId) {
        const titulo = await this.toolkit.generarTituloChat(pregunta, respuesta);
        nuevoTitulo = titulo;

        const nuevoChat = await this.toolkit.crearNuevoChat(fk_user, titulo);
        chatId = nuevoChat.id_chat;

        this.logger.log(`📌 Chat creado con título: "${titulo}" y ID: ${chatId}`);
      }

      // 6️⃣ Guardar mensaje y respuesta
      await this.toolkit.guardarPreguntaYRespuesta(chatId, pregunta, respuesta);

      // 7️⃣ Respuesta estructurada
      return ResponseUtil.success(
        {
          respuesta,
          chatId,
          ...(nuevoTitulo && { titulo: nuevoTitulo }),
          // opcionalmente puedes incluir tipo/sql/datos si los necesitas para debugging
        },
        'Consulta mixta procesada correctamente'
      );

    } catch (error) {
      this.logger.error('❌ Error en ClasificacionHandler', error);
      throw new Error('Error al procesar la consulta inteligente');
    }
  }
}
