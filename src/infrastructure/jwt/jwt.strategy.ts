// infrastructure/jwt/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Clase de infraestructura: JwtStrategy.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secretoSeguro123',
    });
  }

  /**
     * Ejecuta la operación técnica de validate.
     * @param payload Parámetro de entrada de tipo any.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async validate(payload: any) {
    return {
      userId: payload.sub,
      correo: payload.correo,
      rol: payload.rol,
    };
  }
}
