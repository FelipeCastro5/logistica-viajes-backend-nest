import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClienteRepository } from '../../infrastructure/repository/cliente.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { ClienteController } from '../controllers/cliente.controller';

import { CreateClienteHandler } from '../../application/cliente/handlers/create-cliente.handler';
import { UpdateClienteHandler } from '../../application/cliente/handlers/update-cliente.handler';
import { DeleteClienteHandler } from '../../application/cliente/handlers/delete-cliente.handler';
import { GetAllClientesHandler } from '../../application/cliente/handlers/get-all-clientes.handler';
import { GetClienteByIdHandler } from '../../application/cliente/handlers/get-cliente-by-id.handler';
import { GetClientesByUsuarioHandler } from '../../application/cliente/handlers/get-cliente-by-usuario.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'ClienteInterface',
      useClass: ClienteRepository,
    },
    CreateClienteHandler,
    UpdateClienteHandler,
    DeleteClienteHandler,
    GetAllClientesHandler,
    GetClienteByIdHandler,
    GetClientesByUsuarioHandler,
  ],
  controllers: [ClienteController],
})
export class ClienteModule {}
