import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateViajeCommand } from '../commands/create-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateViajeCommand)
@Injectable()
export class CreateViajeHandler implements ICommandHandler<CreateViajeCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) { }

  async execute(command: CreateViajeCommand) {
    try {
      const viaje = await this.viajeRepository.createViaje(
        command.fk_usuario,
        command.fk_manifiesto,
        command.fk_cliente,
        command.fk_origen,
        command.fk_destino,
        command.codigo,
        command.observaciones,
        command.estado_viaje,
        command.producto,
        command.detalle_producto,
        command.direccion_llegada,
        command.fecha_salida,
        command.fecha_llegada,
        command.latitud_origen,
        command.longitud_origen,
        command.latitud_destino,
        command.longitud_destino,
        command.fecha_hora_salida,
        command.fecha_hora_llegada,
        command.horas_pactadas_cargue,
        command.horas_pactadas_descargue,
        command.exoneracion_legal
      );
      return ResponseUtil.success(viaje, 'Viaje creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
