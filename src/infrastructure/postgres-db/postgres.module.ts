import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostgresService } from "./postgres.service";
import postgresConfig from "./postgres.config";

/**
 * Clase de infraestructura: PostgresModule.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Global()
@Module({
    imports:[
        ConfigModule.forRoot({
            load:[postgresConfig],
            isGlobal: true,
        }),
    ],
    providers: [PostgresService],
    exports: [PostgresService]
})
export class PostgresModule{}