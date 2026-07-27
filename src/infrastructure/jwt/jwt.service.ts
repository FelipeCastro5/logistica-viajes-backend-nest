// infrastructure/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

/**
 * Clase de infraestructura: JwtService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class JwtService {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly jwt: NestJwtService) {}

  /**
     * Ejecuta la operación técnica de generarToken.
     * @param payload Parámetro de entrada de tipo any.
     * @param expiresIn Parámetro de entrada de tipo any.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async generarToken(payload: any, expiresIn = '1h'): Promise<string> {
    return this.jwt.signAsync(payload, { expiresIn });
  }

  /**
     * Ejecuta la operación técnica de verificarToken.
     * @param token Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async verificarToken(token: string): Promise<any> {
    return this.jwt.verifyAsync(token);
  }
}
