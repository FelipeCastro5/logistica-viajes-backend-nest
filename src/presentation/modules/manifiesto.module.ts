import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ManifiestoRepository } from '../../infrastructure/repository/manifiesto.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { ManifiestoController } from '../controllers/manifiesto.controller';

import { CreateManifiestoHandler } from '../../application/manifiesto/handlers/create-manifiesto.handler';
import { UpdateManifiestoHandler } from '../../application/manifiesto/handlers/update-manifiesto.handler';
import { DeleteManifiestoHandler } from '../../application/manifiesto/handlers/delete-manifiesto.handler';
import { GetAllManifiestosHandler } from '../../application/manifiesto/handlers/get-all-manifiestos.handler';
import { GetManifiestoByIdHandler } from '../../application/manifiesto/handlers/get-manifiesto-by-id.handler';
import { UpdateTotalGastosHandler } from 'src/application/manifiesto/handlers/update-total-gastos.handler';

/**
 * Clase de presentación: ManifiestoModule.
 * Maneja la interacción entre el cliente (HTTP) y el sistema.
 */
@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'ManifiestoInterface',
      useClass: ManifiestoRepository,
    },
    CreateManifiestoHandler,
    UpdateManifiestoHandler,
    DeleteManifiestoHandler,
    GetAllManifiestosHandler,
    GetManifiestoByIdHandler,
    UpdateTotalGastosHandler,
  ],
  controllers: [ManifiestoController],
})
export class ManifiestoModule {}
