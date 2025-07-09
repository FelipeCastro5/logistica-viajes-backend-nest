import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetGastoXViajeByIdCommand } from '../commands/get-gastoxviaje-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetGastoXViajeByIdCommand)
@Injectable()
export class GetGastoxviajeByIdHandler implements IQueryHandler<GetGastoXViajeByIdCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(command: GetGastoXViajeByIdCommand) {
    try {
      const gasto = await this.repository.getById(command.id);
      if (!gasto) {
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }
      return ResponseUtil.success(gasto, 'Gasto por viaje encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetGastoXViajeByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el gasto por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
