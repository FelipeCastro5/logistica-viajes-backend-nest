import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTipodocCommand } from '../commands/update-tipodoc.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateTipodocCommand)
@Injectable()
export class UpdateTipodocHandler implements ICommandHandler<UpdateTipodocCommand> {
  constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  async execute(command: UpdateTipodocCommand) {
    try {
      const result = await this.tipodocRepository.updateTipodoc(
        command.id,
        command.nombre_documento,
        command.abreviatura
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Tipo de documento no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Tipo de documento actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateTipodocHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el tipo de documento';
      return ResponseUtil.error(message, status);
    }
  }
}
