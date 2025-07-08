import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLugarCommand } from '../commands/update-lugar.command';
import { Inject, Injectable } from '@nestjs/common';
import { LugarInterface } from '../../../domain/lugar-domain/lugar.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateLugarCommand)
@Injectable()
export class UpdateLugarHandler implements ICommandHandler<UpdateLugarCommand> {
  constructor(
    @Inject('LugarInterface')
    private readonly lugarRepository: LugarInterface,
  ) {}

  async execute(command: UpdateLugarCommand) {
    try {
      const result = await this.lugarRepository.updateLugar(command.id, command.nombre_lugar);
      if (!result?.id_lugar) {
        return ResponseUtil.error('Lugar no encontrado', 404);
      }
      return ResponseUtil.success(result, 'Lugar actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateLugarHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el lugar';
      return ResponseUtil.error(message, status);
    }
  }
}
