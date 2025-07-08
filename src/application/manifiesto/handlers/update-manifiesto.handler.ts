// update-manifiesto.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateManifiestoCommand } from '../commands/update-manifiesto.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateManifiestoCommand)
@Injectable()
export class UpdateManifiestoHandler implements ICommandHandler<UpdateManifiestoCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(command: UpdateManifiestoCommand) {
    try {
      const result = await this.manifiestoRepository.updateManifiesto(
        command.id,
        command.flete_total,
        command.porcentaje_retencion_fuente,
        command.valor_retencion_fuente,
        command.porcentaje_ica,
        command.valor_ica,
        command.deduccion_fiscal,
        command.neto_a_pagar,
        command.anticipo,
        command.saldo_a_pagar,
        command.total_gastos,
        command.queda_al_carro,
        command.a_favor_del_carro,
        command.porcentaje_conductor,
        command.ganacia_conductor
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Manifiesto no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Manifiesto actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateManifiestoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el manifiesto';
      return ResponseUtil.error(message, status);
    }
  }
}
