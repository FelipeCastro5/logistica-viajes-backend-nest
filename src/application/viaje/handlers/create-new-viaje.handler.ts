import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewViajeCommand } from '../commands/create-new-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateNewViajeCommand)
@Injectable()
export class CreateNewViajeHandler implements ICommandHandler<CreateNewViajeCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(command: CreateNewViajeCommand) {
    try {
      var estado_viaje = true;
      const viaje = await this.viajeRepository.createNewViaje(
        command.fk_usuario,
        command.fk_cliente,
        command.fk_origen,
        command.fk_destino,
        command.codigo,
        command.observaciones,
        estado_viaje,
        command.producto,
        command.detalle_producto,
        command.direccion_llegada,
        command.fecha_salida,
        command.fecha_llegada,
        //manifiesto
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
      return ResponseUtil.success(viaje, 'Viaje creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateNewViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
