// infrastructure/jwt/jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Clase de infraestructura: JwtGuard.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
