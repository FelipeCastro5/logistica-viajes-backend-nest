import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetGastoByIdCommand } from '../commands/get-gasto-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetGastoByIdCommand)
@Injectable()
export class GetGastoByIdHandler implements IQueryHandler<GetGastoByIdCommand> {
  constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  async execute(command: GetGastoByIdCommand) {
    try {
      const gasto = await this.gastoRepository.getById(command.id);
      if (!gasto) {
        return ResponseUtil.error('Gasto no encontrado', 404);
      }
      return ResponseUtil.success(gasto, 'Gasto encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetGastoByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el gasto';
      return ResponseUtil.error(message, status);
    }
  }
}
