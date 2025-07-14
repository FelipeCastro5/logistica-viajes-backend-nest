import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRepository } from './auth.repository';
import { PostgresModule } from '../postgres-db/postgres.module';
import { AuthController } from './auth.controller';

import { JwtCustomModule } from '../jwt/jwt.module';
import { LoginHandler } from './handlers/login.handler';
import { UpdatePasswordHandler } from './handlers/update-password.handler';

@Module({
  imports: [PostgresModule, CqrsModule, JwtCustomModule],
  providers: [
    {
      provide: 'AuthInterface',
      useClass: AuthRepository,
    },
    LoginHandler,
    UpdatePasswordHandler,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
