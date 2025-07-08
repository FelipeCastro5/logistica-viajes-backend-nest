import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ViajeRepository } from '../../infrastructure/repository/viaje.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { ViajeController } from '../controllers/viaje.controller';

import { CreateViajeHandler } from '../../application/viaje/handlers/create-viaje.handler';
import { UpdateViajeHandler } from '../../application/viaje/handlers/update-viaje.handler';
import { DeleteViajeHandler } from '../../application/viaje/handlers/delete-viaje.handler';
import { GetAllViajesHandler } from '../../application/viaje/handlers/get-all-viajes.handler';
import { GetViajeByIdHandler } from '../../application/viaje/handlers/get-viaje-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'ViajeInterface',
      useClass: ViajeRepository,
    },
    CreateViajeHandler,
    UpdateViajeHandler,
    DeleteViajeHandler,
    GetAllViajesHandler,
    GetViajeByIdHandler,
  ],
  controllers: [ViajeController],
})
export class ViajeModule {}
