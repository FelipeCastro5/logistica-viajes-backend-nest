import { Module } from "@nestjs/common";
import { GeminiService } from "../gemini-ia/gemini.service";
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
@Module({
  imports: [ChatModule, MensajeModule], 
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
