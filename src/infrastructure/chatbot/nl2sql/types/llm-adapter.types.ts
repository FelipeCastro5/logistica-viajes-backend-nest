export interface GenerateSqlInput {
  prompt: string;
  schemaDigest: any;
  model: string;
  temperature?: number;
  maxTokens?: number;
}
