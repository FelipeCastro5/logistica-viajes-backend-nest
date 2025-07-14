import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { loginCommand } from '../commands/login.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../../application/utilities/response.util';
import { JwtService } from '../../../infrastructure/jwt/jwt.service';
import { HashService } from '../../../application/utilities/hash.service';
import { AuthInterface } from '../auth.interface';

@QueryHandler(loginCommand)
@Injectable()
export class LoginHandler implements IQueryHandler<loginCommand> {
    constructor(
        @Inject('AuthInterface')
        private readonly authRepository: AuthInterface,
        private readonly jwtService: JwtService,
    ) { }

    async execute(command: loginCommand) {
        try {
            const usuario = await this.authRepository.login(command.correo);
            if (!usuario) {
                return ResponseUtil.error('Usuario no encontrado', 404);
            }
            const passwordMatch = await HashService.compare(command.contrasena, usuario.contrasena);
            if (!passwordMatch) {
                return ResponseUtil.error('Contraseña incorrecta', 401);
            }

            const payload = {
                sub: usuario.id,
                correo: usuario.correo,
                rol: usuario.fk_rol,
            };

            const token = await this.jwtService.generarToken(payload);

            return ResponseUtil.success(token, 'Usuario encontrado exitosamente');

        } catch (error) {
            console.error('Error en GetUsuarioByCorreoHandler:', error);
            const status = error.getStatus?.() ?? 500;
            const message = error.response?.message || 'Error al obtener el usuario';
            return ResponseUtil.error(message, status);
        }
    }
}
