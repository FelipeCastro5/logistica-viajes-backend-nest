import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUsuarioByCorreoCommand } from '../commands/get-usuario-by-correo.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { JwtService } from 'src/infrastructure/jwt/jwt.service';
import { HashService } from 'src/application/utilities/hash.service';

@QueryHandler(GetUsuarioByCorreoCommand)
@Injectable()
export class GetUsuarioByCorreoHandler implements IQueryHandler<GetUsuarioByCorreoCommand> {
    constructor(
        @Inject('UsuarioInterface')
        private readonly usuarioRepository: UsuarioInterface,
        private readonly jwtService: JwtService,
    ) { }

    async execute(command: GetUsuarioByCorreoCommand) {
        try {
            const usuario = await this.usuarioRepository.getByCorreo(command.correo);
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
