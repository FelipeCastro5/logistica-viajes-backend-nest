import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { RemesaRepository } from '../../infrastructure/repository/remesa.repository';
import { RemesaController } from '../controllers/remesa.controller';

import { CreateRemesaHandler } from '../../application/remesa/handlers/create-remesa.handler';
import { UpdateRemesaHandler } from '../../application/remesa/handlers/update-remesa.handler';
import { DeleteRemesaHandler } from '../../application/remesa/handlers/delete-remesa.handler';
import { GetAllRemesasHandler } from '../../application/remesa/handlers/get-all-remesas.handler';
import { GetRemesaByIdHandler } from '../../application/remesa/handlers/get-remesa-by-id.handler';
import { GetRemesasByViajeHandler } from '../../application/remesa/handlers/get-remesas-by-viaje.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'RemesaInterface',
      useClass: RemesaRepository,
    },
    CreateRemesaHandler,
    UpdateRemesaHandler,
    DeleteRemesaHandler,
    GetAllRemesasHandler,
    GetRemesaByIdHandler,
    GetRemesasByViajeHandler,
  ],
  controllers: [RemesaController],
})
export class RemesaModule {}
