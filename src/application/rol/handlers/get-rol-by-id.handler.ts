import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRolByIdCommand } from '../commands/get-rol-by-id.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetRolByIdCommand)
@Injectable()
export class GetRolByIdHandler implements IQueryHandler<GetRolByIdCommand> {
  constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  async execute(command: GetRolByIdCommand) {
    try {
      const rol = await this.rolRepository.getById(command.id);
      if (!rol) {
        return ResponseUtil.error('Rol no encontrado', 404);
      }
      return ResponseUtil.success(rol, 'Rol encontrado exitosamente');
    } catch (error) {
      console.error('Error en GetRolByIdHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener el rol';
      return ResponseUtil.error(message, status);
    }
  }
}
