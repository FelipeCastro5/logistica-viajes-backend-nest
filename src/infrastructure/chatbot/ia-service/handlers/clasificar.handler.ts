import { Injectable, Logger } from '@nestjs/common';
import { IaToolkitService } from '../ia-toolkit.service';
import { HistoryHandler } from './history.handler';
import { SqlHandler } from './sql.handler';
import { MixtoHandler } from './mixto.handler';

@Injectable()
export class ClasificacionHandler {
  private readonly logger = new Logger(ClasificacionHandler.name);

  constructor(
    private readonly toolkit: IaToolkitService,
    private readonly historyHandler: HistoryHandler,
    private readonly sqlHandler: SqlHandler,
    private readonly mixtoHandler: MixtoHandler,
  ) {}

  // idea, en lugar de cargar toda la db, si cargarlo, pero solo para pedir 
  // las tablas puntuales a las q se consultara informacion
  // en otra consulta, mandar puntualmente esas tablas y pedir la query

  async procesarPreguntaInteligente(fk_user: number, fk_chat: number | null, pregunta: string): Promise<any> {
    try {
      const tipo = await this.toolkit.clasificarTipoDePregunta(pregunta);
      this.logger.debug(`🤖 Tipo de flujo clasificado: ${tipo}`);

      if (tipo === 'historial') {
        const respuesta = await this.historyHandler.procesarChatSimple(fk_user, fk_chat, pregunta);
        return { tipo, respuesta };
      }

      if (tipo === 'sql') {
        const resultado = await this.sqlHandler.procesarConsultaDb(fk_user, pregunta);
        return { tipo, ...resultado };
      }

      if (tipo === 'mixto') {
        const resultado = await this.mixtoHandler.procesarFlujoMixto(fk_user, pregunta);
        return { tipo, ...resultado };
      }

      this.logger.warn(`⚠️ Tipo de flujo desconocido: ${tipo}. Ejecutando como historial por defecto.`);
      const respuesta = await this.historyHandler.procesarChatSimple(fk_user, fk_chat,pregunta);
      return { tipo: 'historial', respuesta };
    } catch (error) {
      this.logger.error('❌ Error en procesarPreguntaInteligente', error);
      throw new Error('Ocurrió un error al procesar la pregunta con IA.');
    }
  }
}
