import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VehiculoRepository } from '../../infrastructure/repository/vehiculo.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { VehiculoController } from '../controllers/vehiculo.controller';

import { CreateVehiculoHandler } from '../../application/vehiculo/handlers/create-vehiculo.handler';
import { UpdateVehiculoHandler } from '../../application/vehiculo/handlers/update-vehiculo.handler';
import { DeleteVehiculoHandler } from '../../application/vehiculo/handlers/delete-vehiculo.handler';
import { GetAllVehiculosHandler } from '../../application/vehiculo/handlers/get-all-vehiculos.handler';
import { GetVehiculoByIdHandler } from '../../application/vehiculo/handlers/get-vehiculo-by-id.handler';
import { GetVehiculosByUsuarioHandler } from '../../application/vehiculo/handlers/get-vehiculos-by-usuario.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'VehiculoInterface',
      useClass: VehiculoRepository,
    },
    CreateVehiculoHandler,
    UpdateVehiculoHandler,
    DeleteVehiculoHandler,
    GetAllVehiculosHandler,
    GetVehiculoByIdHandler,
    GetVehiculosByUsuarioHandler,
  ],
  controllers: [VehiculoController],
})
export class VehiculoModule {}
