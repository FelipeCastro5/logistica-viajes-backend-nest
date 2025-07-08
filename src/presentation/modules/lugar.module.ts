import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LugarRepository } from '../../infrastructure/repository/lugar.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { LugarController } from '../controllers/lugar.controller';

import { CreateLugarHandler } from '../../application/lugar/handlers/create-lugar.handler';
import { UpdateLugarHandler } from '../../application/lugar/handlers/update-lugar.handler';
import { DeleteLugarHandler } from '../../application/lugar/handlers/delete-lugar.handler';
import { GetAllLugaresHandler } from '../../application/lugar/handlers/get-all-lugares.handler';
import { GetLugarByIdHandler } from '../../application/lugar/handlers/get-lugar-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'LugarInterface',
      useClass: LugarRepository,
    },
    CreateLugarHandler,
    UpdateLugarHandler,
    DeleteLugarHandler,
    GetAllLugaresHandler,
    GetLugarByIdHandler,
  ],
  controllers: [LugarController],
})
export class LugarModule {}
