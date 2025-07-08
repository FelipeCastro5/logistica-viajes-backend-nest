import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGastoCommand } from '../commands/create-gasto.command';
import { Inject, Injectable } from '@nestjs/common';
import { GastoInterface } from '../../../domain/gasto-domain/gasto.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateGastoCommand)
@Injectable()
export class CreateGastoHandler implements ICommandHandler<CreateGastoCommand> {
  constructor(
    @Inject('GastoInterface')
    private readonly gastoRepository: GastoInterface,
  ) {}

  async execute(command: CreateGastoCommand) {
    try {
      const gasto = await this.gastoRepository.createGasto(command.nombre_gasto);
      return ResponseUtil.success(gasto, 'Gasto creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateGastoHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el gasto';
      return ResponseUtil.error(message, status);
    }
  }
}
