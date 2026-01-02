import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFirmasByViajeCommand } from '../commands/get-firmas-by-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetFirmasByViajeCommand)
@Injectable()
export class GetFirmasByViajeHandler
  implements IQueryHandler<GetFirmasByViajeCommand>
{
  constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  async execute(command: GetFirmasByViajeCommand) {
    try {
      const firmas = await this.firmaRepository.getFirmasByViaje(
        command.fk_viaje,
      );

      if (!firmas || firmas.length === 0) {
        return ResponseUtil.error('Firmas no encontradas', 404);
      }

      return ResponseUtil.success(
        firmas,
        'Firmas obtenidas exitosamente',
      );
    } catch (error) {
      console.error('Error en GetFirmasByViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener las firmas';
      return ResponseUtil.error(message, status);
    }
  }
}
