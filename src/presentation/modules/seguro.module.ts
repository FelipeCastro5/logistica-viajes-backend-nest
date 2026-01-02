import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { SeguroRepository } from '../../infrastructure/repository/seguro.repository';
import { SeguroController } from '../controllers/seguro.controller';

import { CreateSeguroHandler } from '../../application/seguro/handlers/create-seguro.handler';
import { UpdateSeguroHandler } from '../../application/seguro/handlers/update-seguro.handler';
import { DeleteSeguroHandler } from '../../application/seguro/handlers/delete-seguro.handler';
import { GetAllSegurosHandler } from '../../application/seguro/handlers/get-all-seguros.handler';
import { GetSeguroByIdHandler } from '../../application/seguro/handlers/get-seguro-by-id.handler';
import { GetSegurosByVehiculoHandler } from '../../application/seguro/handlers/get-seguros-by-vehiculo.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'SeguroInterface',
      useClass: SeguroRepository,
    },
    CreateSeguroHandler,
    UpdateSeguroHandler,
    DeleteSeguroHandler,
    GetAllSegurosHandler,
    GetSeguroByIdHandler,
    GetSegurosByVehiculoHandler,
  ],
  controllers: [SeguroController],
})
export class SeguroModule {}
