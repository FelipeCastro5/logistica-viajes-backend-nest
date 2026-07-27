import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenRouterService } from './openrouter.service';
import { OpenRouterController } from './openrouter.controller';

/**
 * Clase de infraestructura: OpenRouterModule.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Module({
  imports: [ConfigModule],
  providers: [OpenRouterService],
  controllers: [OpenRouterController],
  exports: [OpenRouterService],
})
export class OpenRouterModule {}
