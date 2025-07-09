import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MensajeRepository } from '../../infrastructure/repository/mensaje.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { MensajeController } from '../controllers/mensaje.controller';

import { CreateMensajeHandler } from '../../application/mensaje/handlers/create-mensaje.handler';
import { UpdateMensajeHandler } from '../../application/mensaje/handlers/update-mensaje.handler';
import { DeleteMensajeHandler } from '../../application/mensaje/handlers/delete-mensaje.handler';
import { GetAllMensajesHandler } from '../../application/mensaje/handlers/get-all-mensajes.handler';
import { GetMensajeByIdHandler } from '../../application/mensaje/handlers/get-mensaje-by-id.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'MensajeInterface',
      useClass: MensajeRepository,
    },
    CreateMensajeHandler,
    UpdateMensajeHandler,
    DeleteMensajeHandler,
    GetAllMensajesHandler,
    GetMensajeByIdHandler,
  ],
  controllers: [MensajeController],
})
export class MensajeModule {}
