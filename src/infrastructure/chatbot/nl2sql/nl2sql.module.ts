import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresSchemaService } from './shema/postgres-schema.service';
import { SchemaCacheService } from './shema/schema-cache.service';
import { SchemaDigestService } from './shema/schema-digest.service';
import { SchemaAliasService } from './alias/schema-alias.service';
import { TableRankerService } from './ranking/table-ranker.service';
import { LlmConfigService } from './llm/llm-config.service';
import { OpenAIAdapter } from './llm/adapters/openai.adapter';
import { GeminiAdapter } from './llm/adapters/gemini.adapter';
import { DeepSeekAdapter } from './llm/adapters/deepseek.adapter';
import { LlmAdapterFactory } from './llm/llm-adapter.factory';
import { Nl2sqlPromptBuilder } from './prompt/nl2sql-prompt-builder.service';
import { SqlGuardsService } from './guards/sql-guards.service';
import { SqlPostprocessService } from './postprocess/sql-postprocess.service';
import { Nl2sqlService } from './nl2sql.service';
import { InternalNl2sqlController } from './controllers/internal-nl2sql.controller';
import { Nl2sqlController } from './controllers/nl2sql.controller';
import { PostgresModule } from 'src/infrastructure/postgres-db/postgres.module';

@Module({
  imports: [
    PostgresModule,
    ConfigModule, // 👈 necesario para TTL, limits, schemas
  ],
  providers: [
    // Schema & ranking
    PostgresSchemaService,
    SchemaCacheService,
    SchemaDigestService,
    SchemaAliasService,
    TableRankerService,
    // LLM config
    LlmConfigService,

    // 👇 LLM Adapters (ESTO FALTABA)
    OpenAIAdapter,
    GeminiAdapter,
    DeepSeekAdapter,

    // Factory
    LlmAdapterFactory,

    // NL2SQL pipeline
    Nl2sqlPromptBuilder,
    SqlGuardsService,
    SqlPostprocessService,
    Nl2sqlService,
  ],
  exports: [
    SchemaCacheService,
    SchemaDigestService,
    LlmConfigService,
  ],
  controllers: [Nl2sqlController, InternalNl2sqlController],
})
export class Nl2sqlModule { }
