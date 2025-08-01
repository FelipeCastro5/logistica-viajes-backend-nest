import { Inject, Injectable } from '@nestjs/common';
import { GetConductoresByFilterCommand } from '../commands/get-conductores-by-filter.command';
import { UsuarioInterface } from 'src/domain/usuario-domain/usuario.interface';
import { ResponseUtil } from 'src/application/utilities/response.util';
import { ResponseDto } from 'src/application/utilities/response.dto';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetConductoresByFilterCommand)
export class GetConductoresByFilterHandler implements IQueryHandler<GetConductoresByFilterCommand> {

    constructor(
        @Inject('UsuarioInterface')
        private readonly usuarioRepository: UsuarioInterface,
    ) { }

    async execute(command: GetConductoresByFilterCommand): Promise<ResponseDto> {
        try {
            const { filter, limit, page } = command;
            const offset = (page - 1) * limit;

            const { data, total } = await this.usuarioRepository.findConductorByFilter(filter, limit, offset);
            const totalPages = Math.ceil(total / limit);

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
            console.error('Error en GetConductoresByFilterHandler:', error);
            const status = error.getStatus?.() ?? 500;
            const message = error.response?.message || 'Error al obtener usuarios';
            return ResponseUtil.error(message, status);
        }
    }
}
