import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSeguroCommand } from '../commands/update-seguro.command';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateSeguroCommand)
@Injectable()
export class UpdateSeguroHandler
  implements ICommandHandler<UpdateSeguroCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute(command: UpdateSeguroCommand) {
    try {
      const result = await this.seguroRepository.updateSeguro(
        command.id,
        command.fk_vehiculo,
        command.tipo_seguro,
        command.numero_poliza,
        command.aseguradora,
        command.fecha_vencimiento,
        command.valor,
      );

      if (!result?.rowCount) {
        return ResponseUtil.error('Seguro no encontrado', 404);
      }

      return ResponseUtil.success(
        null,
        'Seguro actualizado exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en UpdateSeguroHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al actualizar el seguro';
      return ResponseUtil.error(message, status);
    }
  }
}
