import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRemesaCommand } from '../commands/update-remesa.command';
import { Inject, Injectable } from '@nestjs/common';
import { RemesaInterface } from '../../../domain/remesa-domain/remesa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateRemesaCommand)
@Injectable()
export class UpdateRemesaHandler
  implements ICommandHandler<UpdateRemesaCommand>
{
  constructor(
    @Inject('RemesaInterface')
    private readonly remesaRepository: RemesaInterface,
  ) {}

  async execute(command: UpdateRemesaCommand) {
    try {
      const result = await this.remesaRepository.updateRemesa(
        command.id,
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

      if (!result?.rowCount) {
        return ResponseUtil.error('Remesa no encontrada', 404);
      }

      return ResponseUtil.success(null, 'Remesa actualizada exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateRemesaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al actualizar la remesa';
      return ResponseUtil.error(message, status);
    }
  }
}
