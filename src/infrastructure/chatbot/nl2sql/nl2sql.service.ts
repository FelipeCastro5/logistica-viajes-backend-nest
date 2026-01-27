import { Injectable } from '@nestjs/common';
import { Nl2sqlPromptBuilder } from './prompt/nl2sql-prompt-builder.service';
import { SqlGuardsService } from './guards/sql-guards.service';
import { SqlPostprocessService } from './postprocess/sql-postprocess.service';
import { LlmConfigService } from './llm/llm-config.service';
import { SchemaDigestService } from './shema/schema-digest.service';
import { LlmAdapterFactory } from './llm/llm-adapter.factory';
import { ResponseUtil } from 'src/application/utilities/response.util';
import { ResponseDto } from 'src/application/utilities/response.dto';

@Injectable()
export class Nl2sqlService {
  constructor(
    private readonly llmConfig: LlmConfigService,
    private readonly schemaDigest: SchemaDigestService,
    private readonly promptBuilder: Nl2sqlPromptBuilder,
    private readonly adapterFactory: LlmAdapterFactory,
    private readonly sqlGuards: SqlGuardsService,
    private readonly sqlPostprocess: SqlPostprocessService,
  ) { }

  async execute(input: {
    projectId: number;
    question: string;
    context?: {
      bbox?: [number, number, number, number];
      filters?: Record<string, any>;
    };
    debug?: boolean;
  }): Promise<ResponseDto<{
    sql: string;
    provider: string;
    model: string;
    warnings: string[];
    debug?: any;
  }>> {

    const { projectId, question, context, debug } = input;

    // 1️⃣ Configuración LLM del proyecto
    const config = await this.llmConfig.getForProject(projectId);

    // 2️⃣ Schema digest + ranking
    const digest = await this.schemaDigest.getDigest(question);

    // 3️⃣ Construcción del prompt
    const { prompt } = this.promptBuilder.build({
      question,
      schemaDigest: digest,
      ranking: digest.ranking,
      context,
    });

    // 4️⃣ Adapter correcto
    const adapter = this.adapterFactory.getAdapter(config.provider);

    // 5️⃣ Llamada al LLM
    const llmResult = await adapter.generateSQL({
      prompt,
      schemaDigest: digest,
      model: config.model,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    });

    if (!llmResult.sql) {
      throw new Error('El LLM no devolvió SQL');
    }

    // 6️⃣ Postprocess
    const post = this.sqlPostprocess.process(llmResult.sql);

    // 7️⃣ Guards (bloqueo fuerte)
    this.sqlGuards.validate(post.sql);

    // 8️⃣ Respuesta final
    const result: any = {
      sql: post.sql,
      provider: config.provider,
      model: config.model,
      warnings: post.warnings,
    };

    if (debug) {
      result.debug = {
        prompt,
        rawResponse: llmResult.rawResponse,
        schemaTables: Object.keys(digest.tables),
        ranking: digest.ranking,
      };
    }

    // ✅ AQUÍ USAMOS ResponseUtil
    return ResponseUtil.success(result, 'SQL generado correctamente');
  }
}
