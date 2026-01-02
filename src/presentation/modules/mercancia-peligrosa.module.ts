import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';

import { MercanciaPeligrosaController } from '../controllers/mercancia-peligrosa.controller';
import { MercanciaPeligrosaRepository } from '../../infrastructure/repository/mercancia-peligrosa.repository';

import { CreateMercanciaPeligrosaHandler } from '../../application/mercancia-peligrosa/handlers/create-mercancia-peligrosa.handler';
import { UpdateMercanciaPeligrosaHandler } from '../../application/mercancia-peligrosa/handlers/update-mercancia-peligrosa.handler';
import { DeleteMercanciaPeligrosaHandler } from '../../application/mercancia-peligrosa/handlers/delete-mercancia-peligrosa.handler';
import { GetAllMercanciaPeligrosaHandler } from '../../application/mercancia-peligrosa/handlers/get-all-mercancia-peligrosa.handler';
import { GetMercanciaPeligrosaByIdHandler } from '../../application/mercancia-peligrosa/handlers/get-mercancia-peligrosa-by-id.handler';
import { GetMercanciaPeligrosaByRemesaHandler } from '../../application/mercancia-peligrosa/handlers/get-mercancia-peligrosa-by-remesa.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  controllers: [MercanciaPeligrosaController],
  providers: [
    {
      provide: 'MercanciaPeligrosaInterface',
      useClass: MercanciaPeligrosaRepository,
    },
    CreateMercanciaPeligrosaHandler,
    UpdateMercanciaPeligrosaHandler,
    DeleteMercanciaPeligrosaHandler,
    GetAllMercanciaPeligrosaHandler,
    GetMercanciaPeligrosaByIdHandler,
    GetMercanciaPeligrosaByRemesaHandler,
  ],
})
export class MercanciaPeligrosaModule {}
