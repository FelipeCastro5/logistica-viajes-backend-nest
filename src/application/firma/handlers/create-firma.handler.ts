import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFirmaCommand } from '../commands/create-firma.command';
import { Inject, Injectable } from '@nestjs/common';
import { FirmaInterface } from '../../../domain/firma-domain/firma.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateFirmaCommand)
@Injectable()
export class CreateFirmaHandler
  implements ICommandHandler<CreateFirmaCommand>
{
  constructor(
    @Inject('FirmaInterface')
    private readonly firmaRepository: FirmaInterface,
  ) {}

  async execute(command: CreateFirmaCommand) {
    try {
      const firma = await this.firmaRepository.createFirma(
        command.fk_viaje,
        command.tipo_firma,
        command.firma_digital,
      );

      return ResponseUtil.success(
        firma,
        'Firma creada exitosamente',
        201,
      );
    } catch (error) {
      console.error('Error en CreateFirmaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al crear la firma';
      return ResponseUtil.error(message, status);
    }
  }
}
