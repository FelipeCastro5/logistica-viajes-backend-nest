import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRemesaCommand } from '../commands/create-remesa.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateRemesaCommand)
@Injectable()
export class CreateRemesaHandler
  implements ICommandHandler<CreateRemesaCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute(command: CreateRemesaCommand) {
    try {
      const remesa = await this.remesaRepository.createRemesa(
        command.fk_viaje,
        command.numero_remesa,
        command.numero_autorizacion,
        command.tipo_empaque,
        command.naturaleza_carga,
        command.codigo_armonizado,
        command.cantidad,
        command.unidad_medida,
        command.peso_total,
        command.mercancia_peligrosa,
        command.observaciones,
      );

      return ResponseUtil.success(remesa, 'Remesa creada exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateRemesaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear la remesa';
      return ResponseUtil.error(message, status);
    }
  }
}
