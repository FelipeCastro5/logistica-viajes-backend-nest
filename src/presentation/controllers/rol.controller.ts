import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateRolCommand } from '../../application/rol/commands/create-rol.command';
import { UpdateRolCommand } from '../../application/rol/commands/update-rol.command';
import { DeleteRolCommand } from '../../application/rol/commands/delete-rol.command';
import { GetAllRolesCommand } from '../../application/rol/commands/get-all-roles.command';
import { GetRolByIdCommand } from '../../application/rol/commands/get-rol-by-id.command';

import { CreateRolDto } from '../dtos/rol/create-rol.dto';
import { UpdateRolDto } from '../dtos/rol/update-rol.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Roles obtenidos exitosamente' })
  async getAllRoles() {
    return this.queryBus.execute(new GetAllRolesCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async getRolById(@Query('id') id: number) {
    return this.queryBus.execute(new GetRolByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
  async createRol(@Body() dto: CreateRolDto) {
    return this.commandBus.execute(new CreateRolCommand(dto.nombre_rol));
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un rol existente' })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async updateRol(@Body() dto: UpdateRolDto) {
    return this.commandBus.execute(new UpdateRolCommand(dto.id, dto.nombre_rol));
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async deleteRol(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteRolCommand(id));
  }
}
