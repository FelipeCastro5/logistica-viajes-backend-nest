import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllTipodocsCommand } from '../commands/get-all-tipodocs.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllTipodocsCommand)
@Injectable()
export class GetAllTipodocsHandler implements IQueryHandler<GetAllTipodocsCommand> {
  constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const tipodocs = await this.tipodocRepository.getAll();
      return ResponseUtil.success(tipodocs, 'Tipos de documento obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllTipodocsHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los tipos de documento';
      return ResponseUtil.error(message, status);
    }
  }
}
