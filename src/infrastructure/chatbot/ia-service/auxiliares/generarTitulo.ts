
//   public async generarTituloChat(pregunta: string, respuesta ?: string): Promise < string > {
//     return this.chatTitleGenerator.generarTituloChat(
//         pregunta, respuesta, this.preguntarIA.bind(this), // 👈 uso del LLM CENTRAL
//     );
// }


export class ChatTitleGenerator {

  private readonly STOPWORDS = [
    'que', 'cuál', 'cuáles', 'cómo', 'por', 'para',
    'es', 'son', 'el', 'la', 'los', 'las', 'un', 'una',
    'me', 'puedes', 'dime', 'quiero', 'saber', 'haz',
    'del', 'al', 'mi'
  ];

  private normalizarPregunta(p: string): string[] {
    return p
      .toLowerCase()
      .replace(/[¿?¡!.,]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !this.STOPWORDS.includes(w));
  }

  private generarTituloSinIA(pregunta: string): string {
    const tokens = this.normalizarPregunta(pregunta);

    if (tokens.length === 0) return 'Conversación';

    return tokens
      .slice(0, 5)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  private esTituloValido(titulo: string): boolean {
    if (!titulo) return false;
    if (titulo.length < 4) return false;
    if (titulo.toLowerCase() === 'conversación') return false;
    return true;
  }

  /**
   * ⚠️ NO usa IA directamente
   * El fallback a IA se inyecta desde fuera
   */
  async generarTituloChat(
    pregunta: string,
    respuesta?: string,
    usarIA?: (prompt: string) => Promise<string>,
  ): Promise<string> {

    // 1️⃣ Determinístico
    const tituloLocal = this.generarTituloSinIA(pregunta);

    if (this.esTituloValido(tituloLocal)) {
      return tituloLocal.slice(0, 80);
    }

    // 2️⃣ Fallback IA (opcional)
    if (usarIA) {
      try {
        const prompt = `
Genera un título corto y descriptivo (máximo 80 caracteres)
para una conversación entre un usuario y un asistente.

Pregunta inicial:
"${pregunta}"

${respuesta ? `Respuesta inicial:\n"${respuesta}"` : ''}

Devuelve SOLO el título, sin comillas ni explicaciones.
`;

        const tituloIA = await usarIA(prompt);

        return tituloIA
          .replace(/["'\n]/g, '')
          .trim()
          .slice(0, 80);

      } catch {
        /* ignore */
      }
    }

    // 3️⃣ Fallback final
    return 'Conversación';
  }
}
