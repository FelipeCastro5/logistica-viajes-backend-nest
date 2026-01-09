import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVehiculoCommand } from '../commands/update-vehiculo.command';
import { Inject, Injectable } from '@nestjs/common';
import { VehiculoInterface } from '../../../domain/vehiculo-domain/vehiculo.interface';
import { ResponseUtil } from '../../utilities/response.util';
import { parsePlaca } from '../../utilities/placa.util'; // 🔹 importamos la función de parseo

@CommandHandler(UpdateVehiculoCommand)
@Injectable()
export class UpdateVehiculoHandler implements ICommandHandler<UpdateVehiculoCommand> {
  constructor(
    @Inject('VehiculoInterface')
    private readonly vehiculoRepository: VehiculoInterface,
  ) {}

  async execute(command: UpdateVehiculoCommand) {
    try {
      // 🔹 Validamos y normalizamos la placa
      const placaParsed = parsePlaca(command.placa);
      if (!placaParsed.valid) {
        return ResponseUtil.error(placaParsed.message, 400);
      }

      const result = await this.vehiculoRepository.updateVehiculo(
        command.id,
        command.fk_usuario,
        placaParsed.value, // usamos la placa normalizada
        command.marca,
        command.configuracion,
        command.tipo_vehiculo,
        command.peso_vacio,
        command.peso_remolque,
      );

      if (!result?.rowCount) {
        return ResponseUtil.error('Vehículo no encontrado', 404);
      }

      return ResponseUtil.success(
        null,
        'Vehículo actualizado exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en UpdateVehiculoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message || 'Error al actualizar el vehículo';
      return ResponseUtil.error(message, status);
    }
  }
}
