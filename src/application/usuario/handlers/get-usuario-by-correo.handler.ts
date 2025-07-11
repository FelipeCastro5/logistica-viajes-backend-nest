import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUsuarioByCorreoCommand } from '../commands/get-usuario-by-correo.command';
import { Inject, Injectable } from '@nestjs/common';
import { UsuarioInterface } from '../../../domain/usuario-domain/usuario.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { JwtService } from 'src/infrastructure/jwt/jwt.service';

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
            } else if (usuario.contrasena != command.contrasena) {
                return ResponseUtil.error('Contraseña incorrecta', 404);
            }
            // Esto extrae la propiedad contraseña en uno nuevo
            //const { contrasena, ...usuarioSinContrasena } = usuario;

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
