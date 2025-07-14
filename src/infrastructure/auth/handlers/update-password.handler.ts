// update-usuario.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../../application/utilities/response.util';
import { UpdatePasswordCommand } from '../commands/update-password.command';
import { AuthInterface } from '../auth.interface';
import { HashService } from 'src/application/utilities/hash.service';

@CommandHandler(UpdatePasswordCommand)
@Injectable()
export class UpdatePasswordHandler implements ICommandHandler<UpdatePasswordCommand> {
  constructor(
    @Inject('AuthInterface')
    private readonly authRepository: AuthInterface,
  ) { }

  async execute(command: UpdatePasswordCommand) {
    try {
      const hashedPassword = await HashService.hash(command.contrasena);
      const result = await this.authRepository.updatePassword(
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
