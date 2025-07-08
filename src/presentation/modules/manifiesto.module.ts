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
  ],
  controllers: [ManifiestoController],
})
export class ManifiestoModule {}
