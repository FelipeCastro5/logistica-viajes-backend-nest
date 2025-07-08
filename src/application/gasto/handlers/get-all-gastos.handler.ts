import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllGastosCommand } from '../commands/get-all-gastos.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllGastosCommand)
@Injectable()
export class GetAllGastosHandler implements IQueryHandler<GetAllGastosCommand> {
  constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const gastos = await this.gastoRepository.getAll();
      return ResponseUtil.success(gastos, 'Gastos obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllGastosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los gastos';
      return ResponseUtil.error(message, status);
    }
  }
}
