import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { FirmaController } from '../controllers/firma.controller';
import { FirmaRepository } from '../../infrastructure/repository/firma.repository';

import { CreateFirmaHandler } from '../../application/firma/handlers/create-firma.handler';
import { UpdateFirmaHandler } from '../../application/firma/handlers/update-firma.handler';
import { DeleteFirmaHandler } from '../../application/firma/handlers/delete-firma.handler';
import { GetAllFirmasHandler } from '../../application/firma/handlers/get-all-firmas.handler';
import { GetFirmaByIdHandler } from '../../application/firma/handlers/get-firma-by-id.handler';
import { GetFirmasByViajeHandler } from '../../application/firma/handlers/get-firmas-by-viaje.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'FirmaInterface',
      useClass: FirmaRepository,
    },
    CreateFirmaHandler,
    UpdateFirmaHandler,
    DeleteFirmaHandler,
    GetAllFirmasHandler,
    GetFirmaByIdHandler,
    GetFirmasByViajeHandler,
  ],
  controllers: [FirmaController],
})
export class FirmaModule {}
