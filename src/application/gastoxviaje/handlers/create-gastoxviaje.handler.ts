import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGastoXViajeCommand } from '../commands/create-gastoxviaje.command';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseUtil } from '../../utilities/response.util';
import { GastoxviajeInterface } from '../../../domain/gastoxviaje-domain/gastoxviaje.interface';

@CommandHandler(CreateGastoXViajeCommand)
@Injectable()
export class CreateGastoxviajeHandler implements ICommandHandler<CreateGastoXViajeCommand> {
  constructor(
    @Inject('GastoxviajeInterface')
    private readonly repository: GastoxviajeInterface,
  ) {}

  async execute(command: CreateGastoXViajeCommand) {
    try {
      const gasto = await this.repository.createGastoxviaje(
        command.fk_viaje,
        command.fk_gasto,
        command.valor,
        command.detalles
      );
      return ResponseUtil.success(gasto, 'Gasto por viaje creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateGastoXViajeHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el gasto por viaje';
      return ResponseUtil.error(message, status);
    }
  }
}
