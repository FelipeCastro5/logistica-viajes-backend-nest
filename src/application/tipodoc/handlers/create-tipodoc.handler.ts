import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTipodocCommand } from '../commands/create-tipodoc.command';
import { Inject, Injectable } from '@nestjs/common';
import { TipodocInterface } from '../../../domain/tipodoc-domain/tipodoc.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateTipodocCommand)
@Injectable()
export class CreateTipodocHandler implements ICommandHandler<CreateTipodocCommand> {
  constructor(
    @Inject('TipodocInterface')
    private readonly tipodocRepository: TipodocInterface,
  ) {}

  async execute(command: CreateTipodocCommand) {
    try {
      const tipodoc = await this.tipodocRepository.createTipodoc(
        command.nombre_documento,
        command.abreviatura
      );
      return ResponseUtil.success(tipodoc, 'Tipo de documento creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateTipodocHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el tipo de documento';
      return ResponseUtil.error(message, status);
    }
  }
}
