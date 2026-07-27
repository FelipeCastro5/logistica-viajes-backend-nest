import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

/**
 * Clase de infraestructura: GeminiModule.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Module({
  imports: [ConfigModule],
  providers: [GeminiService],
  controllers: [GeminiController],
})
export class GeminiModule {}
