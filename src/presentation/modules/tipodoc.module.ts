import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TipodocRepository } from '../../infrastructure/repository/tipodoc.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { TipodocController } from '../../presentation/controllers/tipodoc.controller';

import { CreateTipodocHandler } from '../../application/tipodoc/handlers/create-tipodoc.handler';
import { UpdateTipodocHandler } from '../../application/tipodoc/handlers/update-tipodoc.handler';
import { DeleteTipodocHandler } from '../../application/tipodoc/handlers/delete-tipodoc.handler';
import { GetAllTipodocsHandler } from '../../application/tipodoc/handlers/get-all-tipodocs.handler';
import { GetTipodocByIdHandler } from '../../application/tipodoc/handlers/get-tipodoc-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'TipodocInterface',
      useClass: TipodocRepository,
    },
    CreateTipodocHandler,
    UpdateTipodocHandler,
    DeleteTipodocHandler,
    GetAllTipodocsHandler,
    GetTipodocByIdHandler,
  ],
  controllers: [TipodocController],
})
export class TipodocModule {}
