import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFirmaCommand } from '../commands/delete-firma.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(DeleteFirmaCommand)
@Injectable()
export class DeleteFirmaHandler
  implements ICommandHandler<DeleteFirmaCommand>
{
  constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  async execute(command: DeleteFirmaCommand) {
    try {
      const result = await this.firmaRepository.deleteFirma(command.id);

      if (!result?.rowCount) {
        return ResponseUtil.error('Firma no encontrada', 404);
      }

      return ResponseUtil.success(
        null,
        'Firma eliminada exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en DeleteFirmaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al eliminar la firma';
      return ResponseUtil.error(message, status);
    }
  }
}
