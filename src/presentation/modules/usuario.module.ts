import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsuarioRepository } from '../../infrastructure/repository/usuario.repository';
import { PostgresModule } from '../../infrastructure/postgres-db/postgres.module';
import { UsuarioController } from '../controllers/usuario.controller';

import { CreateUsuarioHandler } from '../../application/usuario/handlers/create-usuario.handler';
import { UpdateUsuarioHandler } from '../../application/usuario/handlers/update-usuario.handler';
import { DeleteUsuarioHandler } from '../../application/usuario/handlers/delete-usuario.handler';
import { GetAllUsuariosHandler } from '../../application/usuario/handlers/get-all-usuarios.handler';
import { GetUsuarioByIdHandler } from '../../application/usuario/handlers/get-usuario-by-id.handler';
import { GetUsuarioByCorreoHandler } from 'src/application/usuario/handlers/get-usuario-by-correo.handler';

@Module({
  imports: [PostgresModule, CqrsModule],
  providers: [
    {
      provide: 'UsuarioInterface',
      useClass: UsuarioRepository,
    },
    CreateUsuarioHandler,
    UpdateUsuarioHandler,
    DeleteUsuarioHandler,
    GetAllUsuariosHandler,
    GetUsuarioByIdHandler,
    GetUsuarioByCorreoHandler,
  ],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
