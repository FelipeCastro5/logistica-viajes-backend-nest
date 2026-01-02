import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllSegurosCommand } from '../commands/get-all-seguros.command';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllSegurosCommand)
@Injectable()
export class GetAllSegurosHandler
  implements IQueryHandler<GetAllSegurosCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute() {
    try {
      const seguros = await this.seguroRepository.getAll();

      if (!seguros || seguros.length === 0) {
        return ResponseUtil.error('Seguros no encontrados', 404);
      }

      return ResponseUtil.success(
        seguros,
        'Seguros obtenidos exitosamente',
      );
    } catch (error) {
      console.error('Error en GetAllSegurosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los seguros';
      return ResponseUtil.error(message, status);
    }
  }
}
