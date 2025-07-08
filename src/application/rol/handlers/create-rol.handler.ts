import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolCommand } from '../commands/create-rol.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

@CommandHandler(CreateRolCommand)
@Injectable()
export class CreateRolHandler implements ICommandHandler<CreateRolCommand> {
  constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  async execute(command: CreateRolCommand) {
    try {
      const rol = await this.rolRepository.createRol(command.nombre_rol);
      return ResponseUtil.success(rol, 'Rol creado exitosamente', 201);
    } catch (error) {
      console.error('Error en CreateRolHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al crear el rol';
      return ResponseUtil.error(message, status);
    }
  }
}
