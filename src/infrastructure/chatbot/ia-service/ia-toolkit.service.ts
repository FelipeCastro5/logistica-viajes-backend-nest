import { Inject, Injectable, Logger } from '@nestjs/common';
import { GeminiService } from '../llm-services/gemini-ia/gemini.service';
import { PostgresService } from '../../postgres-db/postgres.service';
// import * as fs from 'fs';
// import * as path from 'path';
import { Chat } from 'src/domain/chat-domain/chat.entity';
import { ChatInterface } from 'src/domain/chat-domain/chat.interface';
import { MensajeInterface } from 'src/domain/mensaje-domain/mensaje.interface';
import { SchemaDigestService } from '../nl2sql/shema/schema-digest.service';
import { SchemaCacheService } from '../nl2sql/shema/schema-cache.service';
import { OpenRouterService } from '../llm-services/openrouter-ia/openrouter.service';
import { OpenAIService } from '../llm-services/openai-ia/openai.service';
import { DeepSeekService } from '../llm-services/deepseek-ia/deepseek.service';
type DigestTable = {
  columns: Record<string, string>;
  foreignKeys?: {
    column: string;
    references: {
      table: string;
      column: string;
    };
  }[];
};

type SchemaDigest = {
  tables: Record<string, DigestTable>;
};

@Injectable()
export class IaToolkitService {
  private readonly logger = new Logger(IaToolkitService.name);

  constructor(
    private readonly digestService: SchemaDigestService,
    private readonly cacheService: SchemaCacheService,

    private readonly geminiService: GeminiService,
    private readonly openRouterService: OpenRouterService,
    private readonly postgresService: PostgresService,
    private readonly openAIService: OpenAIService,
    private readonly deepSeekService: DeepSeekService,

    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) { }

  // fallback automático entre modelos de IA
  private async preguntarIA(prompt: string): Promise<string> {

    // 1. Intentar OpenIA primero
    try {
      this.logger.log('🤖 Consultando OpenAI...');
      return await this.openAIService.preguntarOpenAI(prompt);
    } catch (error) {
      this.logger.error(
        '❌ Error consultando OpenAI.',
        error instanceof Error ? error.stack : error,
      );
    }

    // 2. Intentar Gemini segundo
    try {
      this.logger.log('🤖 Consultando Gemini...');
      return await this.geminiService.preguntarGemini(prompt);
    } catch (error) {
      this.logger.error(
        '❌ Error consultando Gemini.',
        error instanceof Error ? error.stack : error,
      );
    }

    // 3. Intentar DeepSeek como tercer paso
    try {
      this.logger.log('🤖 Consultando DeepSeek...');
      return await this.deepSeekService.preguntarDeepSeek(prompt);
    } catch (error) {
      this.logger.error(
        '❌ Error consultando DeepSeek.',
        error instanceof Error ? error.stack : error,
      );
    }

    // 4. Fallback a OpenRouter (Devstral)
    try {
      this.logger.log('🤖 Consultando OpenRouter (Devstral)...');
      return await this.openRouterService.preguntar(prompt);
    } catch (error) {
      this.logger.error(
        '❌ Error consultando OpenRouter.',
        error instanceof Error ? error.stack : error,
      );
      throw new Error('Ningún proveedor de IA pudo responder');
    }
  }


  // 🔹 Consultar al cliente IA directamente desde IaToolkitService
  public async preguntarIACliente(pregunta: string): Promise<string> {
    return await this.preguntarIA(pregunta);
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
            Responde de forma clara y en español en un máximo de 400 a 500 caracteres."`;
  }

  public async generarTituloChat(
    pregunta: string,
    respuesta?: string
  ): Promise<string> {
    const prompt = `
Genera un título corto y descriptivo (máximo 80 caracteres)
para una conversación entre un usuario y un asistente.

Pregunta inicial:
"${pregunta}"

${respuesta ? `Respuesta inicial:\n"${respuesta}"` : ''}

Devuelve SOLO el título, sin comillas ni explicaciones.
`;

    const titulo = await this.preguntarIA(prompt);

    return titulo
      .replace(/["'\n]/g, '')
      .trim()
      .slice(0, 80);
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
  //   public async generarSQLDesdePregunta(preguntaUsuario: string, fk_user: number): Promise<string> {
  //     const esquemaPath = path.join(process.cwd(), 'src', 'infrastructure', 'utilities', 'esquema.sql');
  //     const estructuraSQL = fs.readFileSync(esquemaPath, 'utf8');

  //     const promptSQL = `Eres un asistente experto en SQL y tienes acceso a esta estructura de base de datos:

  // ${estructuraSQL}

  // Responde la siguiente pregunta del usuario con una consulta SQL válida:
  // "${preguntaUsuario}"

  // 🟡 Instrucciones importantes:
  // 1. Si necesitas aplicar funciones de agregación como SUM, COUNT o AVG, **evita usar ORDER BY directamente a menos que agrupes correctamente o uses una subconsulta**.
  // 2. Prefiere subconsultas para operaciones como "el último registro", "el total de X del último viaje", etc.
  // 3. Si es necesario filtrar por usuario, incluye **WHERE fk_usuario = ${fk_user}** o la columna equivalente, si existe.
  // 4. Para coincidencias de texto, usa ILIKE con comodines '%', por ejemplo: ILIKE '%valor%'.
  // 5. No incluyas comentarios, explicaciones ni bloques de código. Devuelve **solo la SQL** en una sola línea si es posible.

  // Asegúrate de que la consulta sea ejecutable y no genere errores SQL de agregación.`;

  //     const sqlGeneradoRaw = await this.preguntarIA(promptSQL);

  //     const sqlLimpio: string = sqlGeneradoRaw.replace(/```sql|```/g, '').trim();

  //     this.logger.debug(`🔍 SQL generado:\n${sqlLimpio}`);

  //     return sqlLimpio;
  //   }

  // 🔹 Generar SQL a partir de pregunta usando Schema Digest (NL2SQL)
  public async generarSQLDesdePregunta(
    preguntaUsuario: string,
    fk_user: number
  ): Promise<string> {

    // 1️⃣ Obtener digest filtrado por intención del usuario
    const digest = await this.obtenerSchemaDigest(preguntaUsuario);

    // 2️⃣ Convertir digest a texto entendible por la IA
    const schemaContext = Object.entries(digest.tables)
      .map(([fullName, table]) => {
        const columns = Object.keys(table.columns)
          .map(col => `  - ${col}`)
          .join('\n');

        return `Tabla ${fullName}:\n${columns}`;
      })
      .join('\n\n');

    // 3️⃣ Prompt SQL optimizado
    const promptSQL = `
Eres un asistente experto en PostgreSQL.

Estas son las ÚNICAS tablas relevantes del esquema:

${schemaContext}

Relaciones importantes:
${Object.entries(digest.tables)
        .map(([fullName, table]) =>
          (table.foreignKeys || [])
            .map(
              fk =>
                `- ${fullName}.${fk.column} → ${fk.references.table}.${fk.references.column}`
            )
            .join('\n')
        )
        .filter(Boolean)
        .join('\n')}

Pregunta del usuario:
"${preguntaUsuario}"

🟡 Instrucciones estrictas:
1. Devuelve SOLO una consulta SQL válida (PostgreSQL).
2. No incluyas explicaciones, comentarios ni markdown.
3. Usa JOIN explícitos cuando sea necesario.
4. Si usas SUM, COUNT o AVG, asegúrate de agrupar correctamente.
5. Para texto usa ILIKE con '%'.
6. Si aplica seguridad por usuario, filtra con fk_usuario = ${fk_user}.
7. La consulta debe ser ejecutable sin errores.
8. Si una columna es BOOLEAN, solo usa TRUE o FALSE, nunca strings como 'activo', 'inactivo', 'sí', 'no'.
9, Si una columna representa estado activo/inactivo y es BOOLEAN, asume: activo = TRUE, inactivo = FALSE
`;

    // 4️⃣ Llamar IA con fallback automático
    const sqlGeneradoRaw = await this.preguntarIA(promptSQL);

    // 5️⃣ Limpieza defensiva
    const sqlLimpio = sqlGeneradoRaw
      .replace(/```sql|```/gi, '')
      .trim();

    this.logger.debug(`🧠 SQL generado:\n${sqlLimpio}`);

    return sqlLimpio;
  }


  // 🔹 Obtener digest del esquema para NL2SQL
  public async obtenerSchemaDigest(usuarioQuery?: string): Promise<SchemaDigest> {
    this.logger.log('📦 Obteniendo digest del schema...');

    const digest = await this.digestService.getDigest(usuarioQuery ?? '');

    this.logger.debug(
      `Digest generado con ${Object.keys(digest.tables).length} tablas`
    );

    return digest as SchemaDigest;
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

    const respuesta = await this.preguntarIA(promptConclusion);
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

    const respuesta = await this.preguntarIA(promptClasificacion);
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
