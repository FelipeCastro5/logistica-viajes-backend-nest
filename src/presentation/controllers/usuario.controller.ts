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

/**
 * Controlador REST para Usuario.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  /**
     * Endpoint para la operación de getAllUsuarios.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente' })
  async getAllUsuarios() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllUsuariosCommand());
    }

  /**
     * Endpoint para la operación de getUsuarioById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUsuarioById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetUsuarioByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createUsuario.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async createUsuario(@Body() dto: CreateUsuarioDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateUsuarioCommand(
          dto.fk_tipodoc, dto.num_doc, dto.fk_rol, dto.fk_contador, dto.p_nombre, dto.s_nombre,
          dto.p_apellido, dto.s_apellido, dto.telefono, dto.correo, dto.contrasena,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateUsuario.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  async updateUsuario(@Body() dto: UpdateUsuarioDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
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
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteUsuario.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  async deleteUsuario(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteUsuarioCommand(id));
    }


  /**
     * Endpoint para la operación de getUsuariosByFilter.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param filter Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @param limit Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @param page Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getConductoresByFilter')
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
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(
          new GetConductoresByFilterCommand(filter, Number(limit), Number(page))
        );
    }
}
