import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTotalGastosCommand } from '../commands/update-total-gastos.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateTotalGastosCommand)
@Injectable()
export class UpdateTotalGastosHandler implements ICommandHandler<UpdateTotalGastosCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(command: UpdateTotalGastosCommand) {
    const { fk_viaje } = command;

    try {
      // Obtener total de gastos según el viaje
      const totalGastos = await this.manifiestoRepository.getTotalGastosByViajeId(fk_viaje);

      // Actualizar el manifiesto usando ese total
      const result = await this.manifiestoRepository.updateTotalGastosManifiesto(fk_viaje, totalGastos);

      if (result?.rowCount === 1) {
        return ResponseUtil.success(
          { updated: true, total_gastos: totalGastos },
          'Total de gastos actualizado correctamente'
        );
      }

      return ResponseUtil.error(
        'No se actualizó ningún manifiesto. Verifique que el viaje tenga un manifiesto asociado.',
        404
      );
    } catch (error) {
      console.error('Error en UpdateTotalGastosHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar total_gastos';
      return ResponseUtil.error(message, status);
    }
  }
}
