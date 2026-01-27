import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/infrastructure/postgres-db/postgres.service';

export type LlmProvider = 'openai' | 'gemini' | 'deepseek';

export interface LlmProjectConfig {
  projectId: number;
  provider: LlmProvider;
  model: string;
  temperature: number;
  maxTokens: number;
}

@Injectable()
export class LlmConfigService {
  private readonly SUPPORTED_PROVIDERS: LlmProvider[] = [
    'openai',
    'gemini',
    'deepseek',
  ];

  constructor(private readonly db: PostgresService) { }

  async getForProject(projectId: number): Promise<LlmProjectConfig> {
    const { rows } = await this.db.query<{
      project_id: number;
      provider: string;
      model: string;
      temperature: number | null;
      max_tokens: number | null;
      enabled: boolean;
    }>(
      `
      SELECT
        project_id,
        provider,
        model,
        temperature,
        max_tokens,
        enabled
      FROM llm_project_config
      WHERE project_id = $1
      LIMIT 1
      `,
      [projectId],
    );

    if (rows.length === 0) {
      throw new Error(`Proyecto ${projectId} no tiene configuración NL2SQL`);
    }

    const cfg = rows[0];

    if (!cfg.enabled) {
      throw new Error(`NL2SQL está deshabilitado para el proyecto ${projectId}`);
    }

    if (!this.SUPPORTED_PROVIDERS.includes(cfg.provider as LlmProvider)) {
      throw new Error(`Proveedor LLM no soportado: ${cfg.provider}`);
    }

    return {
      projectId: cfg.project_id,
      provider: cfg.provider as LlmProvider,
      model: cfg.model,
      temperature: Number(cfg.temperature ?? 0.2), // <--- CONVERTIR
      maxTokens: Number(cfg.max_tokens ?? 512),
    };
  }
}
