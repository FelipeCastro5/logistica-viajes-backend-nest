import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTipodocByIdCommand } from '../commands/get-tipodoc-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetTipodocByIdCommand)
@Injectable()
export class GetTipodocByIdHandler implements IQueryHandler<GetTipodocByIdCommand> {
  constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  async execute(command: GetTipodocByIdCommand) {
    try {
      const tipodoc = await this.tipodocRepository.getById(command.id);
      if (!tipodoc) {
        return ResponseUtil.error('Tipo de documento no encontrado', 404);
      }
      return ResponseUtil.success(tipodoc, 'Tipo de documento encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetTipodocByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el tipo de documento';
      return ResponseUtil.error(message, status);
    }
  }
}
