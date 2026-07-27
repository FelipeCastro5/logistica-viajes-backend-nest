import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTipodocCommand } from '../../application/tipodoc/commands/create-tipodoc.command';
import { UpdateTipodocCommand } from '../../application/tipodoc/commands/update-tipodoc.command';
import { DeleteTipodocCommand } from '../../application/tipodoc/commands/delete-tipodoc.command';
import { GetAllTipodocsCommand } from '../../application/tipodoc/commands/get-all-tipodocs.command';
import { GetTipodocByIdCommand } from '../../application/tipodoc/commands/get-tipodoc-by-id.command';

import { CreateTipodocDto } from '../dtos/tipodoc/create-tipodoc.dto';
import { UpdateTipodocDto } from '../dtos/tipodoc/update-tipodoc.dto';

/**
 * Controlador REST para Tipodoc.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Tipos de Documento')
@Controller('tipodoc')
export class TipodocController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAll.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los tipos de documento' })
  @ApiResponse({ status: 200, description: 'Tipos de documento obtenidos exitosamente' })
  async getAll() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllTipodocsCommand());
    }

  /**
     * Endpoint para la operación de getById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener tipo de documento por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de documento encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async getById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetTipodocByIdCommand(id));
    }

  /**
     * Endpoint para la operación de create.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo tipo de documento' })
  @ApiResponse({ status: 201, description: 'Tipo de documento creado exitosamente' })
  async create(@Body() dto: CreateTipodocDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateTipodocCommand(dto.nombre_documento, dto.abreviatura);
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de update.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un tipo de documento existente' })
  @ApiResponse({ status: 200, description: 'Tipo de documento actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async update(@Body() dto: UpdateTipodocDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateTipodocCommand(dto.id, dto.nombre_documento, dto.abreviatura);
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de delete.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un tipo de documento por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de documento eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async delete(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteTipodocCommand(id));
    }
}
