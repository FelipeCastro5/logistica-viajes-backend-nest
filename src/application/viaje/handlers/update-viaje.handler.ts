import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateViajeCommand } from '../commands/update-viaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ViajeInterface } from '../../../domain/viaje-domain/viaje.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateViajeCommand)
@Injectable()
export class UpdateViajeHandler implements ICommandHandler<UpdateViajeCommand> {
  constructor(
    @Inject('ViajeInterface')
    private readonly viajeRepository: ViajeInterface,
  ) {}

  async execute(command: UpdateViajeCommand) {
    try {
      const result = await this.viajeRepository.updateViaje(
        command.id,
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
        command.fecha_llegada
      );
      if (!result?.rowCount) {
        return ResponseUtil.error('Viaje no encontrado', 404);
      }
      return ResponseUtil.success(null, 'Viaje actualizado exitosamente', 200);
    } catch (error) {
      console.error('Error en UpdateViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al actualizar el viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
