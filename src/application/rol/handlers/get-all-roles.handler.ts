import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllRolesCommand } from '../commands/get-all-roles.command';
import { Inject, Injectable } from '@nestjs/common';
import { RolInterface } from '../../../domain/rol-domain/rol.interface';
import { ResponseUtil } from '../../utilities/response.util';

@QueryHandler(GetAllRolesCommand)
@Injectable()
export class GetAllRolesHandler implements IQueryHandler<GetAllRolesCommand> {
  constructor(
    @Inject('RolInterface')
    private readonly rolRepository: RolInterface,
  ) {}

  async execute(): Promise<any> {
    try {
      const roles = await this.rolRepository.getAll();
      return ResponseUtil.success(roles, 'Roles obtenidos exitosamente');
    } catch (error) {
      console.error('Error en GetAllRolesHandler:', error);
      const status = error.getStatus?.() ?? 500;
      const message = error.response?.message || 'Error al obtener los roles';
      return ResponseUtil.error(message, status);
    }
  }
}
