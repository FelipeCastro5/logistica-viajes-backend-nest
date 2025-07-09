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

@ApiTags('Tipos de Documento')
@Controller('tipodoc')
export class TipodocController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los tipos de documento' })
  @ApiResponse({ status: 200, description: 'Tipos de documento obtenidos exitosamente' })
  async getAll() {
    return this.queryBus.execute(new GetAllTipodocsCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener tipo de documento por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de documento encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async getById(@Query('id') id: number) {
    return this.queryBus.execute(new GetTipodocByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo tipo de documento' })
  @ApiResponse({ status: 201, description: 'Tipo de documento creado exitosamente' })
  async create(@Body() dto: CreateTipodocDto) {
    const command = new CreateTipodocCommand(dto.nombre_documento, dto.abreviatura);
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un tipo de documento existente' })
  @ApiResponse({ status: 200, description: 'Tipo de documento actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async update(@Body() dto: UpdateTipodocDto) {
    const command = new UpdateTipodocCommand(dto.id, dto.nombre_documento, dto.abreviatura);
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un tipo de documento por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de documento eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async delete(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteTipodocCommand(id));
  }
}
