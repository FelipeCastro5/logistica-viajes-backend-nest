import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllGastosXViajeCommand } from '../commands/get-all-gastosxviaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllGastosXViajeCommand)
@Injectable()
export class GetAllGastoxviajeHandler implements IQueryHandler<GetAllGastosXViajeCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const gastos = await this.repository.getAll();
      return ResponseUtil.success(gastos, 'Gastos por viaje obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllGastosXViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los gastos por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
