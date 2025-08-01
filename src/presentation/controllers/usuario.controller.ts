import { Body, Controller, Delete, Get, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUsuarioCommand } from '../../application/usuario/commands/create-usuario.command';
import { UpdateUsuarioCommand } from '../../application/usuario/commands/update-usuario.command';
import { DeleteUsuarioCommand } from '../../application/usuario/commands/delete-usuario.command';
import { GetAllUsuariosCommand } from '../../application/usuario/commands/get-all-usuarios.command';
import { GetUsuarioByIdCommand } from '../../application/usuario/commands/get-usuario-by-id.command';

import { CreateUsuarioDto } from '../dtos/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/usuario/update-usuario.dto';
import { ResponseDto } from 'src/application/utilities/response.dto';
import { GetConductoresByFilterCommand } from 'src/application/usuario/commands/get-conductores-by-filter.command';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente' })
  async getAllUsuarios() {
    return this.queryBus.execute(new GetAllUsuariosCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUsuarioById(@Query('id') id: number) {
    return this.queryBus.execute(new GetUsuarioByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async createUsuario(@Body() dto: CreateUsuarioDto) {
    const command = new CreateUsuarioCommand(
      dto.fk_tipodoc, dto.num_doc, dto.fk_rol, dto.fk_contador, dto.p_nombre, dto.s_nombre,
      dto.p_apellido, dto.s_apellido, dto.telefono, dto.correo, dto.contrasena,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  async updateUsuario(@Body() dto: UpdateUsuarioDto) {
    const command = new UpdateUsuarioCommand(
      dto.id,
      dto.fk_tipodoc,
      dto.num_doc,
      dto.fk_rol,
      dto.fk_contador,
      dto.p_nombre,
      dto.s_nombre,
      dto.p_apellido,
      dto.s_apellido,
      dto.telefono,
      // dto.correo,
      // dto.contrasena,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  async deleteUsuario(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteUsuarioCommand(id));
  }


  @Get('getUsuariosByFilter')
  @ApiOperation({ summary: 'Obtener usuarios filtrados con paginación' })
  @ApiQuery({ name: 'filter', required: false, description: 'Texto a buscar en nombres, documento o correo' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getUsuariosByFilter(
    @Query('filter') filter = '',
    @Query('limit') limit = 10,
    @Query('page') page = 1
  ): Promise<ResponseDto> {
    return this.queryBus.execute(
      new GetConductoresByFilterCommand(filter, Number(limit), Number(page))
    );
  }
}
