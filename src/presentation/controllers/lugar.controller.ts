import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateLugarCommand } from '../../application/lugar/commands/create-lugar.command';
import { UpdateLugarCommand } from '../../application/lugar/commands/update-lugar.command';
import { DeleteLugarCommand } from '../../application/lugar/commands/delete-lugar.command';
import { GetAllLugaresCommand } from '../../application/lugar/commands/get-all-lugares.command';
import { GetLugarByIdCommand } from '../../application/lugar/commands/get-lugar-by-id.command';

import { CreateLugarDto } from '../dtos/lugar/create-lugar.dto';
import { UpdateLugarDto } from '../dtos/lugar/update-lugar.dto';

@ApiTags('Lugares')
@Controller('lugares')
export class LugarController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los lugares' })
  @ApiResponse({ status: 200, description: 'Lugares obtenidos exitosamente' })
  async getAllLugares() {
    return this.queryBus.execute(new GetAllLugaresCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async getLugarById(@Query('id') id: number) {
    return this.queryBus.execute(new GetLugarByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo lugar' })
  @ApiResponse({ status: 201, description: 'Lugar creado exitosamente' })
  async createLugar(@Body() dto: CreateLugarDto) {
    const command = new CreateLugarCommand(dto.nombre_lugar);
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un lugar existente' })
  @ApiResponse({ status: 200, description: 'Lugar actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async updateLugar(@Body() dto: UpdateLugarDto) {
    const command = new UpdateLugarCommand(dto.id, dto.nombre_lugar);
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async deleteLugar(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteLugarCommand(id));
  }
}
