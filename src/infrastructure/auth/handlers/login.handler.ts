import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { loginCommand } from '../commands/login.command';
import { Inject, Injectable } from '@nestjs/common';
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
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                fk_rol: usuario.fk_rol,
                nombre_rol: usuario.nombre_rol,
                fk_contador: usuario.fk_contador,
                p_nombre: usuario.p_nombre,
                p_apellido: usuario.p_apellido,
            };

            //const token = await this.jwtService.generarToken(payload);

            return ResponseUtil.success(payload, 'Usuario encontrado exitosamente');

        } catch (error) {
            console.error('Error en LoginHandler:', error);
            const status = error.getStatus?.() ?? 500;
            const message = error.response?.message || 'Error al obtener el usuario';
            return ResponseUtil.error(message, status);
        }
    }
}
