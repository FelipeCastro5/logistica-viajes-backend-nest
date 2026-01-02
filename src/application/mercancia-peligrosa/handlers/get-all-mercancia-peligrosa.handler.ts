import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllMercanciaPeligrosaCommand } from '../commands/get-all-mercancia-peligrosa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllMercanciaPeligrosaCommand)
@Injectable()
export class GetAllMercanciaPeligrosaHandler
    implements IQueryHandler<GetAllMercanciaPeligrosaCommand> {
    constructor(
        @Inject('MercanciaPeligrosaInterface')
        private readonly mercanciaRepository: MercanciaPeligrosaInterface,
    ) { }

    async execute() {
        try {
            const data = await this.mercanciaRepository.getAll();

            if (!data || data.length === 0) {
                return ResponseUtil.error('Mercancías no encontradas', 404);
            }

            return ResponseUtil.success(
                data,
                'Mercancías peligrosas obtenidas exitosamente',
            );
        } catch (error) {
            console.error('Error en GetAllMercanciaPeligrosaHandler:', error);
            const status = error.getStatus?.() ?? 500;
            const message =
                error.response?.message ||
                'Error al obtener las mercancías peligrosas';
            return ResponseUtil.error(message, status);
        }
    }
}
