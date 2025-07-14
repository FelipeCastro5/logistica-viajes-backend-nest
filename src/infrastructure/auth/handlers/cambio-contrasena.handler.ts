// update-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../../application/utilities/response.util';
import { CambioContrasenaCommand } from '../commands/cambio-contrasena.command';
import { AuthInterface } from '../auth.interface';
import { HashService } from 'src/application/utilities/hash.service';

@CommandHandler(CambioContrasenaCommand)
@Injectable()
export class CambioContrasenaHandler implements ICommandHandler<CambioContrasenaCommand> {
  constructor(
    @Inject('AuthInterface')
    private readonly authRepository: AuthInterface,
  ) { }

  async execute(command: CambioContrasenaCommand) {
    try {
      const hashedPassword = await HashService.hash(command.contrasena);
      const result = await this.authRepository.cambioContrasena(
        command.id,
        hashedPassword,
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Usuario no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Contraseña cambiado exitosamente', 200);
    } catch (error) {
      console.error('Error en CambioContrasenaCommand:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al cambiar contraseña';
      return ResponseUtil.error(message, status);
    }
  }
}
