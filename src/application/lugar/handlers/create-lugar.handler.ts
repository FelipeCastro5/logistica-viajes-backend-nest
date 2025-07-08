import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLugarCommand } from '../commands/create-lugar.command';
import { Inject, Injectable } from '@nestjs/common';
import { LugarInterface } from '../../../domain/lugar-domain/lugar.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateLugarCommand)
@Injectable()
export class CreateLugarHandler implements ICommandHandler<CreateLugarCommand> {
  constructor(
    @Inject('LugarInterface')
    private readonly lugarRepository: LugarInterface,
  ) {}

  async execute(command: CreateLugarCommand) {
    try {
      const lugar = await this.lugarRepository.createLugar(command.nombre_lugar);
      return ResponseUtil.success(lugar, 'Lugar creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateLugarHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el lugar';
      return ResponseUtil.error(message, status);
    }
  }
}
