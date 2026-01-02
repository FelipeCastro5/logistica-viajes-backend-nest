import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFirmaByIdCommand } from '../commands/get-firma-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetFirmaByIdCommand)
@Injectable()
export class GetFirmaByIdHandler
  implements IQueryHandler<GetFirmaByIdCommand>
{
  constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  async execute(command: GetFirmaByIdCommand) {
    try {
      const firma = await this.firmaRepository.getById(command.id);

      if (!firma) {
        return ResponseUtil.error('Firma no encontrada', 404);
      }

      return ResponseUtil.success(
        firma,
        'Firma encontrada exitosamente',
      );
    } catch (error) {
      console.error('Error en GetFirmaByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al obtener la firma';
      return ResponseUtil.error(message, status);
    }
  }
}
