import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolRepository } from '../../infrastructure/repository/rol.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { RolController } from '../controllers/rol.controller';

import { CreateRolHandler } from '../../application/rol/handlers/create-rol.handler';
import { UpdateRolHandler } from '../../application/rol/handlers/update-rol.handler';
import { DeleteRolHandler } from '../../application/rol/handlers/delete-rol.handler';
import { GetAllRolesHandler } from '../../application/rol/handlers/get-all-roles.handler';
import { GetRolByIdHandler } from '../../application/rol/handlers/get-rol-by-id.handler';

/**
 * Clase de presentación: RolModule.
 * Maneja la interacción entre el cliente (HTTP) y el sistema.
 */
@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'RolInterface',
      useClass: RolRepository,
    },
    CreateRolHandler,
    UpdateRolHandler,
    DeleteRolHandler,
    GetAllRolesHandler,
    GetRolByIdHandler,
  ],
  controllers: [RolController],
})
export class RolModule {}
