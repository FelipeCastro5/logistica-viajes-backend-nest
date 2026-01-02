import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFirmaCommand } from '../commands/update-firma.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateFirmaCommand)
@Injectable()
export class UpdateFirmaHandler
  implements ICommandHandler<UpdateFirmaCommand>
{
  constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  async execute(command: UpdateFirmaCommand) {
    try {
      const result = await this.firmaRepository.updateFirma(
        command.id,
        command.fk_viaje,
        command.tipo_firma,
        command.firma_digital,
      );

      if (!result || !result?.rowCount || result.length === 0) {
        return ResponseUtil.error('Firma no encontrada', 404);
      }

      return ResponseUtil.success(
        null,
        'Firma actualizada exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en UpdateFirmaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al actualizar la firma';
      return ResponseUtil.error(message, status);
    }
  }
}
