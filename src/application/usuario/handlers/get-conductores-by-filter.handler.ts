import { Inject, Injectable } from '@nestjs/common';
import { GetConductoresByFilterCommand } from '../commands/get-conductores-by-filter.command';
import { UsuarioInterface } from 'src/domain/usuario-domain/usuario.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';
import { ResponseDto } from 'src/application/utilities/response.dto';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

/**
 * Clase manejadora (Handler) para ejecutar la lógica de negocio.
 * Implementa el patrón CQRS para procesar su respectivo comando.
 */
@QueryHandler(GetConductoresByFilterCommand)
export class GetConductoresByFilterHandler implements IQueryHandler<GetConductoresByFilterCommand> {

    /**
     * Constructor del manejador donde se inyectan las dependencias (repositorios, servicios, etc.).
     * @param usuarioRepository Dependencia inyectada para el uso dentro del manejador.
     */
    constructor(
        @Inject('UsuarioInterface')
        private readonly usuarioRepository: UsuarioInterface,
    ) { }

    /**
     * Punto de entrada principal del manejador.
     * Se encarga de orquestar la lógica paso a paso para cumplir con el comando.
     * @param command Contiene los datos del comando para ser procesados.
     * @returns Retorna la respuesta estandarizada con el resultado de la operación.
     */
    async execute(command: GetConductoresByFilterCommand): Promise<ResponseDto> {
        try {
            const { filter, limit, page } = command;
            const offset = (page - 1) * limit;

            const { data, total } = await this.usuarioRepository.findConductorByFilter(filter, limit, offset);
            const totalPages = Math.ceil(total / limit);

            // 2. Retornamos una respuesta exitosa estandarizada indicando que la operación se completó correctamente.

            return ResponseUtil.success({
                logs: data,
                pagination: {
                    total_items: total,
                    total_pages: totalPages,
                    current_page: page,
                    limit,
                    has_next_page: page < totalPages,
                    has_previous_page: page > 1,
                },
            });
        } catch (error) {
            // Capturamos cualquier excepción (ej. problemas de red o de integridad en BD).
            // Registramos el error internamente para depuración técnica.
            console.error('Error en GetConductoresByFilterHandler:', error);
            // Intentamos extraer el código de estado HTTP del error, o aplicamos un 500 por defecto.
            const status = error.getStatus?.() ?? 500;
            // Extraemos el mensaje específico del error o establecemos uno genérico.
            const message = error.response?.message || 'Error al obtener usuarios';
            // Devolvemos la respuesta de error estandarizada al cliente.
            return ResponseUtil.error(message, status);
        }
    }
}
