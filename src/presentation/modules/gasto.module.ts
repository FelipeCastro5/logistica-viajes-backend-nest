import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GastoRepository } from '../../infrastructure/repository/gasto.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { GastoController } from '../controllers/gasto.controller';

import { CreateGastoHandler } from '../../application/gasto/handlers/create-gasto.handler';
import { UpdateGastoHandler } from '../../application/gasto/handlers/update-gasto.handler';
import { DeleteGastoHandler } from '../../application/gasto/handlers/delete-gasto.handler';
import { GetAllGastosHandler } from '../../application/gasto/handlers/get-all-gastos.handler';
import { GetGastoByIdHandler } from '../../application/gasto/handlers/get-gasto-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'GastoInterface',
      useClass: GastoRepository,
    },
    CreateGastoHandler,
    UpdateGastoHandler,
    DeleteGastoHandler,
    GetAllGastosHandler,
    GetGastoByIdHandler,
  ],
 controllers: [GastoController],
})
export class GastoModule {}
