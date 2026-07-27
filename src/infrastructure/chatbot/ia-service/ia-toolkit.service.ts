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

/**
 * Clase de infraestructura: IaToolkitService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class IaToolkitService {
  private readonly logger = new Logger(IaToolkitService.name);

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly digestService: SchemaDigestService,
    private readonly cacheService: SchemaCacheService,

    private readonly geminiService: GeminiService,
    private readonly openRouterService: OpenRouterService,
    private readonly postgresService: PostgresService,

    @Inject('ChatInterface')
    private readonly chatRepository: ChatInterface,
    @Inject('MensajeInterface')
    private readonly mensajeRepository: MensajeInterface,
  ) { }

  // fallback automático entre modelos de IA
  /**
     * Ejecuta la operación técnica de preguntarIA.
     * @param prompt Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
  private async preguntarIA(prompt: string): Promise<string> {

    // 1. Intentar Gemini primero
    try {
      this.logger.log('🤖 Consultando Gemini...');
      return await this.geminiService.preguntarGemini(prompt);
    } catch (error) {
      this.logger.error(
        '❌ Error consultando Gemini.',
        error instanceof Error ? error.stack : error,
      );
    }

    // 2. Fallback a OpenRouter (Devstral)
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
  /**
     * Ejecuta la operación técnica de preguntarIACliente.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async preguntarIACliente(pregunta: string): Promise<string> {
    return await this.preguntarIA(pregunta);
  }

  // 🔹 Crear un nuevo chat
  /**
     * Ejecuta la operación técnica de crearNuevoChat.
     * @param fk_usuario Parámetro de entrada de tipo number.
     * @param nombre_chat Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async crearNuevoChat(fk_usuario: number, nombre_chat: string): Promise<Chat> {
    const nuevoChat = await this.chatRepository.createChat(fk_usuario, nombre_chat);
    this.logger.log(`🆕 Chat creado: [ID ${nuevoChat.id_chat}] "${nuevoChat.nombre_chat}" para usuario ${fk_usuario}`);
    return nuevoChat;
  }

  // 🔹 Obtener historial reciente
  /**
     * Ejecuta la operación técnica de obtenerHistorial.
     * @param fk_chat Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async obtenerHistorial(fk_chat: number) {
    return await this.mensajeRepository.getLastFiveByChat(fk_chat);
  }

  // Prompt sin historial (primer mensaje del chat)
  /**
     * Ejecuta la operación técnica de generarPromptSinHistorial.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public generarPromptSinHistorial(pregunta: string): string {
    return `El usuario pregunta: "${pregunta}". 
            Responde de forma clara y en español en un máximo de 400 a 500 caracteres."`;
  }

  /**
     * Ejecuta la operación técnica de generarTituloChat.
     * @param pregunta Parámetro de entrada de tipo string.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
  /**
     * Ejecuta la operación técnica de generarPromptConHistorial.
     * @param historial Parámetro de entrada de tipo any[].
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public generarPromptConHistorial(historial: any[], pregunta: string): string {
    const contexto = historial
      .map(item => `Usuario: ${item.pregunta}\nIA: ${item.respuesta}`)
      .join('\n\n');

    return `${contexto}\n\nAhora el usuario pregunta: "${pregunta}"\nResponde de forma clara y en español con un límite de 400 a 500 caracteres.`;
  }

  // 🔹 Guardar en historial
  /**
     * Ejecuta la operación técnica de guardarPreguntaYRespuesta.
     * @param fk_chat Parámetro de entrada de tipo number.
     * @param pregunta Parámetro de entrada de tipo string.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
  /**
     * Ejecuta la operación técnica de generarSQLDesdePregunta.
     * @param preguntaUsuario Parámetro de entrada de tipo string.
     * @param fk_user Parámetro de entrada de tipo number.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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
  /**
     * Ejecuta la operación técnica de obtenerSchemaDigest.
     * @param usuarioQuery Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async obtenerSchemaDigest(usuarioQuery?: string): Promise<SchemaDigest> {
    this.logger.log('📦 Obteniendo digest del schema...');

    const digest = await this.digestService.getDigest(usuarioQuery ?? '');

    this.logger.debug(
      `Digest generado con ${Object.keys(digest.tables).length} tablas`
    );

    return digest as SchemaDigest;
  }

  // 🔹 Ejecutar SQL
  /**
     * Ejecuta la operación técnica de ejecutarSQL.
     * @param sql Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async ejecutarSQL(sql: string): Promise<any[]> {
    const resultado = await this.postgresService.query(sql);
    return resultado.rows;
  }

  // 🔹 Generar respuesta final en lenguaje natural
  /**
     * Ejecuta la operación técnica de generarRespuestaEnLenguajeNatural.
     * @param pregunta Parámetro de entrada de tipo string.
     * @param datos Parámetro de entrada de tipo any[].
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public async generarRespuestaEnLenguajeNatural(pregunta: string, datos: any[]): Promise<string> {
    const promptConclusion = `El usuario preguntó: "${pregunta}".
Los datos obtenidos de la base de datos son:

${JSON.stringify(datos)}

Redacta una respuesta clara en español explicando estos resultados.`;

    const respuesta = await this.preguntarIA(promptConclusion);
    return respuesta.trim();
  }

  // 🔹 Clasificar tipo de pregunta
  /**
     * Ejecuta la operación técnica de clasificarTipoDePregunta.
     * @param pregunta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
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

  /**
     * Ejecuta la operación técnica de extraerTituloDeRespuesta.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public extraerTituloDeRespuesta(respuesta: string): string | null {
    const match = respuesta.match(/Título:\s*(.+)/i);
    return match ? match[1].trim() : null;
  }

  /**
     * Ejecuta la operación técnica de removerLineaTitulo.
     * @param respuesta Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    public removerLineaTitulo(respuesta: string): string {
    return respuesta
      .split('\n')
      .filter(linea => !/^título:/i.test(linea.trim()))
      .join('\n')
      .trim();
  }
}
