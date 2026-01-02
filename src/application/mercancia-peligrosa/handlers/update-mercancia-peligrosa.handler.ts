import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMercanciaPeligrosaCommand } from '../commands/update-mercancia-peligrosa.command';
import { Inject, Injectable } from '@nestjs/common';
import { MercanciaPeligrosaInterface } from '../../../domain/mercancia-peligrosa-domain/mercancia-peligrosa.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(UpdateMercanciaPeligrosaCommand)
@Injectable()
export class UpdateMercanciaPeligrosaHandler
  implements ICommandHandler<UpdateMercanciaPeligrosaCommand>
{
  constructor(
    @Inject('MercanciaPeligrosaInterface')
    private readonly mercanciaRepository: MercanciaPeligrosaInterface,
  ) {}

  async execute(command: UpdateMercanciaPeligrosaCommand) {
    try {
      const result =
        await this.mercanciaRepository.updateMercanciaPeligrosa(
          command.id,
          command.fk_remesa,
          command.codigo_un,
          command.grupo_riesgo,
          command.caracteristica_peligrosidad,
          command.embalaje_envase,
        );

      if (!result?.rowCount) {
        return ResponseUtil.error('Mercancía no encontrada', 404);
      }

      return ResponseUtil.success(
        null,
        'Mercancía peligrosa actualizada exitosamente',
        200,
      );
    } catch (error) {
      console.error('Error en UpdateMercanciaPeligrosaHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message =
        error.response?.message ||
        'Error al actualizar la mercancía peligrosa';
      return ResponseUtil.error(message, status);
    }
  }
}
