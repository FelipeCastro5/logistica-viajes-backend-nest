import { GenerateSqlInput } from '../types/llm-adapter.types';

export interface LlmAdapter {
  generateSQL(
    input: GenerateSqlInput,
  ): Promise<{
    sql: string;
    rawResponse?: any;
  }>;
}
