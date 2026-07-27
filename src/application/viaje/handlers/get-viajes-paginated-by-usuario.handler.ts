import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetViajesPaginatedByUsuarioCommand } from '../commands/get-viajes-paginated-by-usuario.command';
import { PaginatedDto } from '../../utilities/paginated.dto';
import { ResponseDto } from '../../utilities/response.dto';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetViajesPaginatedByUsuarioCommand)
@Injectable()
export class GetViajesPaginatedByUsuarioHandler implements IQueryHandler<GetViajesPaginatedByUsuarioCommand> {
  /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param viajeRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
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
          // Validamos el resultado de la operación en base de datos. Si no se encontró o falló, devolvemos error.
          if (!total_items || viajes.length === 0) {
            // Devolvemos la respuesta de error estandarizada al cliente.
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
          // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
          // Registramos el error internamente para depuración técnica.
          console.error('Error en GetViajesPaginatedByUsuarioHandler:', error);
          // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
          const status = error.getStatus?.() ?? 500;
          // Extraemos el mensaje específico del error o establecemos uno genérico.
          const message = error.response?.message || 'Error al obtener viajes paginados';
          // Devolvemos la respuesta de error estandarizada al cliente.
          return ResponseUtil.error(message, status);
        }
    }
}
