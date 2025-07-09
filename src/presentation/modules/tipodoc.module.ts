import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TipodocRepository } from '../../infrastructure/repository/tipodoc.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { TipodocController } from '../../infrastructure/controllers/tipodoc.controller';

import { CreateTipodocHandler } from './handlers/create-tipodoc.handler';
import { UpdateTipodocHandler } from './handlers/update-tipodoc.handler';
import { DeleteTipodocHandler } from './handlers/delete-tipodoc.handler';
import { GetAllTipodocsHandler } from './handlers/get-all-tipodocs.handler';
import { GetTipodocByIdHandler } from './handlers/get-tipodoc-by-id.handler';

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
