import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllFirmasCommand } from '../commands/get-all-firmas.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllFirmasCommand)
@Injectable()
export class GetAllFirmasHandler
    implements IQueryHandler<GetAllFirmasCommand> {
    constructor(
        @Inject('FirmaInterface')
        private readonly firmaRepository: FirmaInterface,
    ) { }

    async execute() {
        try {
            const firmas = await this.firmaRepository.getAll();
            if (!firmas || firmas.length === 0) {
                return ResponseUtil.error('Firmas no encontradas', 404);
            }
            return ResponseUtil.success(
                firmas,
                'Firmas obtenidas exitosamente',
            );
        } catch (error) {
            console.error('Error en GetAllFirmasHandler:', error);
            const status = error.getStatus?.() ?? 500;
            const message =
                error.response?.message || 'Error al obtener las firmas';
            return ResponseUtil.error(message, status);
        }
    }
}
