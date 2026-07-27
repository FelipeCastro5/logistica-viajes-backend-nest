import { Module } from '@nestjs/common';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { HistorialRepository } from '../../infrastructure/repository/historial.repository';

/**
 * Clase de presentación: HistorialModule.
 * Maneja la interacción entre el cliente (HTTP) y el sistema.
 */
@Module({
  imports: [PostgresModule],
  providers: [
    {
      provide: 'HistorialInterface',
      useClass: HistorialRepository,
    },
  ],
  exports: ['HistorialInterface'],
})
export class HistorialModule {}
