import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMercanciaPeligrosaCommand } from '../commands/create-mercancia-peligrosa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateMercanciaPeligrosaCommand)
@Injectable()
export class CreateMercanciaPeligrosaHandler
  implements ICommandHandler<CreateMercanciaPeligrosaCommand>
{
  constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  async execute(command: CreateMercanciaPeligrosaCommand) {
    try {
      const mercancia =
        await this.mercanciaRepository.createMercanciaPeligrosa(
          command.fk_remesa,
          command.codigo_un,
          command.grupo_riesgo,
          command.caracteristica_peligrosidad,
          command.embalaje_envase,
        );

      return ResponseUtil.success(
        mercancia,
        'Mercancía peligrosa creada exitosamente',
        201,
      );
    } catch (error) {
      console.error('Error en CreateMercanciaPeligrosaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message ||
        'Error al crear la mercancía peligrosa';
      return ResponseUtil.error(message, status);
    }
  }
}
