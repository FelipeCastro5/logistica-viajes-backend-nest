import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GastoxviajeRepository } from '../../infrastructure/repository/gastoxviaje.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { GastoxviajeController } from '../controllers/gastoxviaje.controller';

import { CreateGastoxviajeHandler } from '../../application/gastoxviaje/handlers/create-gastoxviaje.handler';
import { UpdateGastoxviajeHandler } from '../../application/gastoxviaje/handlers/update-gastoxviaje.handler';
import { DeleteGastoxviajeHandler } from '../../application/gastoxviaje/handlers/delete-gastoxviaje.handler';
import { GetGastoxviajeByIdHandler } from '../../application/gastoxviaje/handlers/get-gastoxviaje-by-id.handler';
import { GetAllGastoxviajeHandler } from '../../application/gastoxviaje/handlers/get-all-gastosxviaje.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'GastoxviajeInterface',
      useClass: GastoxviajeRepository,
    },
    CreateGastoxviajeHandler,
    UpdateGastoxviajeHandler,
    DeleteGastoxviajeHandler,
    GetAllGastoxviajeHandler,
    GetGastoxviajeByIdHandler,
  ],
  controllers: [GastoxviajeController],
})
export class GastoxviajeModule {}
