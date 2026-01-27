import { Module } from "@nestjs/common";
import { GeminiService } from "../llm-services/gemini-ia/gemini.service";
import { PostgresService } from "../../postgres-db/postgres.service";
import { IaToolkitService } from "./ia-toolkit.service";
import { ClasificacionHandler } from "./handlers/clasificar.handler";
import { MixtoHandler } from "./handlers/mixto.handler";
import { SqlHandler } from "./handlers/sql.handler";
import { HistoryHandler } from "./handlers/history.handler";
import { IaController } from "./ia.controller";
import { MensajeRepository } from "../../repository/mensaje.repository";
import { ChatModule } from "src/presentation/modules/chat.module";
import { MensajeModule } from "src/presentation/modules/mensaje.module";
import { OpenRouterModule } from "../llm-services/openrouter-ia/openrouter.module";
import { OpenAIModule } from "../llm-services/openai-ia/openai.module";
import { DeepSeekModule } from "../llm-services/deepseek-ia/deepseek.module";

@Module({
  imports: [ChatModule, MensajeModule, OpenRouterModule,OpenAIModule, DeepSeekModule], 
  providers: [
    GeminiService,
    PostgresService,
    IaToolkitService,
    //Handlers
    ClasificacionHandler,
    MixtoHandler,
    SqlHandler,
    HistoryHandler,
  ],
  controllers: [IaController],
})
export class iaModule {}
