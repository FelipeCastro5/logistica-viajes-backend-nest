import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { GetGastosByViajeCommand } from '../commands/get-gastos-by-viaje.command';

@QueryHandler(GetGastosByViajeCommand)
@Injectable()
export class GetGastosByViajeHandler implements IQueryHandler<GetGastosByViajeCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(command: GetGastosByViajeCommand) {
    try {
      const gasto = await this.repository.getGastosByViaje(command.fk);
      if (!gasto || gasto.length === 0) {
        return ResponseUtil.error('Gasto por viaje no encontrado', 404);
      }
      return ResponseUtil.success(gasto, 'Gastos por viaje encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetGastosByViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener gastos por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
