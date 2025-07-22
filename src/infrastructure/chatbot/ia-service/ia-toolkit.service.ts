import { Inject, Injectable, Logger } from '@nestjs/common';
import { GeminiService } from '../gemini-ia/gemini.service';
import { PostgresService } from '../../postgres-db/postgres.service';
import * as fs from 'fs';
import * as path from 'path';
import { Chat } from 'src/domain/chat-domain/chat.entity';
import { ChatInterface } from 'src/domain/chat-domain/chat.interface';
import { MensajeInterface } from 'src/domain/mensaje-domain/mensaje.interface';

@Injectable()
export class IaToolkitService {
  private readonly logger = new Logger(IaToolkitService.name);

  constructor(
    private readonly geminiService: GeminiService,
    private readonly postgresService: PostgresService,
    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) { }

  // 🔹 Consultar a Gemini directamente desde IaToolkitService
  public async preguntarGemini(pregunta: string): Promise<string> {
    return await this.geminiService.preguntarGemini(pregunta);
  }

  // 🔹 Crear un nuevo chat
  public async crearNuevoChat(fk_usuario: number, nombre_chat: string): Promise<Chat> {
    const nuevoChat = await this.chatRepository.createChat(fk_usuario, nombre_chat);
    this.logger.log(`🆕 Chat creado: [ID ${nuevoChat.id_chat}] "${nuevoChat.nombre_chat}" para usuario ${fk_usuario}`);
    return nuevoChat;
  }

  // 🔹 Obtener historial reciente
  public async obtenerHistorial(fk_chat: number) {
    return await this.mensajeRepository.getLastFiveByChat(fk_chat);
  }

  // Prompt sin historial (primer mensaje del chat)
  public generarPromptSinHistorial(pregunta: string): string {
    return `El usuario pregunta: "${pregunta}". 
            Responde de forma clara y en español en un máximo de 400 a 500 caracteres. 
            Además, sugiere un título breve (máximo 80 caracteres) que resuma la conversación. 
            Incluye el título iniciando una línea con: "Título: ..."`;
  }

  // Prompt con historial de preguntas y respuestas
  public generarPromptConHistorial(historial: any[], pregunta: string): string {
    const contexto = historial
      .map(item => `Usuario: ${item.pregunta}\nIA: ${item.respuesta}`)
      .join('\n\n');

    return `${contexto}\n\nAhora el usuario pregunta: "${pregunta}"\nResponde de forma clara y en español con un límite de 400 a 500 caracteres.`;
  }

  // 🔹 Guardar en historial
  public async guardarPreguntaYRespuesta(fk_chat: number, pregunta: string, respuesta: string) {
    await this.mensajeRepository.createMensaje(fk_chat, pregunta, respuesta.trim());
  }

  // 🔹 Generar SQL a partir de pregunta
  public async generarSQLDesdePregunta(preguntaUsuario: string, fk_user: number): Promise<string> {
    const esquemaPath = path.join(process.cwd(), 'src', 'infrastructure', 'utilities', 'esquema.sql');
    const estructuraSQL = fs.readFileSync(esquemaPath, 'utf8');

    const promptSQL = `Tienes la siguiente estructura de base de datos:

${estructuraSQL}

Genera una consulta SQL para responder esta pregunta del usuario: "${preguntaUsuario}"

🟡 Importante:
- Asegúrate de **incluir una cláusula WHERE fk_user = ${fk_user}** en la consulta si la tabla contiene esa columna.
- Usa ILIKE (insensible a mayúsculas) para comparar textos.
- Usa comodines % cuando tenga sentido.
- Devuelve **solo la SQL**, sin comentarios ni explicaciones.`;

    const sqlGeneradoRaw = await this.geminiService.preguntarGemini(promptSQL);
    const sqlLimpio = sqlGeneradoRaw.replace(/```sql|```/g, '').trim();

    this.logger.debug(`🔍 SQL generado:\n${sqlLimpio}`);
    return sqlLimpio;
  }


  // 🔹 Ejecutar SQL
  public async ejecutarSQL(sql: string): Promise<any[]> {
    const resultado = await this.postgresService.query(sql);
    return resultado.rows;
  }

  // 🔹 Generar respuesta final en lenguaje natural
  public async generarRespuestaEnLenguajeNatural(pregunta: string, datos: any[]): Promise<string> {
    const promptConclusion = `El usuario preguntó: "${pregunta}".
Los datos obtenidos de la base de datos son:

${JSON.stringify(datos)}

Redacta una respuesta clara en español explicando estos resultados.`;

    const respuesta = await this.geminiService.preguntarGemini(promptConclusion);
    return respuesta.trim();
  }

  // 🔹 Clasificar tipo de pregunta
  public async clasificarTipoDePregunta(pregunta: string): Promise<'sql' | 'historial' | 'mixto'> {
    const promptClasificacion = `Clasifica la siguiente pregunta en una de las siguientes categorías:
        - "sql": si se refiere directamente a obtener datos de una base de datos.
        - "historial": si es una conversación general que no requiere acceso a la base de datos.
        - "mixto": si requiere tanto contexto conversacional como acceso a datos.

        Pregunta: "${pregunta}"
        Devuelve solo una palabra: sql, historial o mixto.`;

    const respuesta = await this.geminiService.preguntarGemini(promptClasificacion);
    const tipo = respuesta.trim().toLowerCase();

    this.logger.debug(`🧠 Clasificación de la pregunta: ${tipo}`);
    if (['sql', 'historial', 'mixto'].includes(tipo)) {
      return tipo as 'sql' | 'historial' | 'mixto';
    }

    this.logger.warn(`⚠️ Clasificación no reconocida: ${tipo}. Se usará 'historial' por defecto.`);
    return 'historial';
  }

  public extraerTituloDeRespuesta(respuesta: string): string | null {
    const match = respuesta.match(/Título:\s*(.+)/i);
    return match ? match[1].trim() : null;
  }

  public removerLineaTitulo(respuesta: string): string {
    return respuesta
      .split('\n')
      .filter(linea => !/^título:/i.test(linea.trim()))
      .join('\n')
      .trim();
  }
}
