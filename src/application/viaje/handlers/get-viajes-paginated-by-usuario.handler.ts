import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetViajesPaginatedByUsuarioCommand } from '../commands/get-viajes-paginated-by-usuario.command';
import { PaginatedDto } from '../../utilities/paginated.dto';
import { ResponseDto } from '../../utilities/response.dto';

@QueryHandler(GetViajesPaginatedByUsuarioCommand)
@Injectable()
export class GetViajesPaginatedByUsuarioHandler implements IQueryHandler<GetViajesPaginatedByUsuarioCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(command: GetViajesPaginatedByUsuarioCommand): Promise<ResponseDto<PaginatedDto>> {
    try {
      const { id_usuario, page, limit } = command;
      const offset = (page - 1) * limit;

      const [viajes, totalObj] = await Promise.all([
        this.viajeRepository.getViajesPaginatedByUsuario(id_usuario, limit, offset),
        this.viajeRepository.countViajesByUsuario(id_usuario),
      ]);

      const total_items = parseInt(totalObj?.total || '0', 10);

      // ⛔ Si no hay viajes, devuelve 404
      if (!total_items || viajes.length === 0) {
        return ResponseUtil.error('No se encontraron viajes para este usuario', 404);
      }

      const total_pages = Math.ceil(total_items / limit);

      const paginatedResult: PaginatedDto = {
        logs: viajes,
        pagination: {
          total_items,
          total_pages,
          current_page: page,
          limit,
          has_next_page: page < total_pages,
          has_previous_page: page > 1,
        },
      };

      return ResponseUtil.success<PaginatedDto>(paginatedResult, 'Viajes paginados obtenidos correctamente');
    } catch (error) {
      console.error('Error en GetViajesPaginatedByUsuarioHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener viajes paginados';
      return ResponseUtil.error(message, status);
    }
  }
}
