// create-manifiesto.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateManifiestoCommand } from '../commands/create-manifiesto.command';
import { Inject, Injectable } from '@nestjs/common';
import { ManifiestoInterface } from '../../../domain/manifiesto-domain/manifiesto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateManifiestoCommand)
@Injectable()
export class CreateManifiestoHandler implements ICommandHandler<CreateManifiestoCommand> {
  constructor(
    @Inject('ManifiestoInterface')
    private readonly manifiestoRepository: ManifiestoInterface,
  ) {}

  async execute(command: CreateManifiestoCommand) {
    try {
      const manifiesto = await this.manifiestoRepository.createManifiesto(
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
        command.ganancia_conductor
      );
      return ResponseUtil.success(manifiesto, 'Manifiesto creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateManifiestoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el manifiesto';
      return ResponseUtil.error(message, status);
    }
  }
}
