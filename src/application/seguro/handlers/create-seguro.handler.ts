import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSeguroCommand } from '../commands/create-seguro.command';
import { Inject, Injectable } from '@nestjs/common';
import { SeguroInterface } from '../../../domain/seguro-domain/seguro.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateSeguroCommand)
@Injectable()
export class CreateSeguroHandler
  implements ICommandHandler<CreateSeguroCommand>
{
  constructor(
    @Inject('SeguroInterface')
    private readonly seguroRepository: SeguroInterface,
  ) {}

  async execute(command: CreateSeguroCommand) {
    try {
      const seguro = await this.seguroRepository.createSeguro(
        command.fk_vehiculo,
        command.tipo_seguro,
        command.numero_poliza,
        command.aseguradora,
        command.fecha_vencimiento,
        command.valor,
      );
      return ResponseUtil.success(seguro, 'Seguro creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateSeguroHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el seguro';
      return ResponseUtil.error(message, status);
    }
  }
}
