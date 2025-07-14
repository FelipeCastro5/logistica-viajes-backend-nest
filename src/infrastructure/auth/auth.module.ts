import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRepository } from './auth.repository';
import { PostgresModule } from '../postgres-db/postgres.module';
import { AuthController } from './auth.controller';

import { JwtCustomModule } from '../jwt/jwt.module';
import { LoginHandler } from './handlers/login.handler';
import { CambioContrasenaHandler } from './handlers/cambio-contrasena.handler';

@Module({
  imports: [PostgresModule, CqrsModule, JwtCustomModule],
  providers: [
    {
      provide: 'AuthInterface',
      useClass: AuthRepository,
    },
    LoginHandler,
    CambioContrasenaHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
