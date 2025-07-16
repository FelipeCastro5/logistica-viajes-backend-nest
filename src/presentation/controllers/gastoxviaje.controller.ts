import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateGastoXViajeCommand } from '../../application/gastoxviaje/commands/create-gastoxviaje.command';
import { UpdateGastoXViajeCommand } from '../../application/gastoxviaje/commands/update-gastoxviaje.command';
import { DeleteGastoXViajeCommand } from '../../application/gastoxviaje/commands/delete-gastoxviaje.command';
import { GetAllGastosXViajeCommand } from '../../application/gastoxviaje/commands/get-all-gastosxviaje.command';
import { GetGastoXViajeByIdCommand } from '../../application/gastoxviaje/commands/get-gastoxviaje-by-id.command';

import { CreateGastoXViajeDto } from '../dtos/gastoxviaje/create-gastoxviaje.dto';
import { UpdateGastoXViajeDto } from '../dtos/gastoxviaje/update-gastoxviaje.dto';
import { GetGastosByViajeCommand } from 'src/application/gastoxviaje/commands/get-gastos-by-viaje.command';

@ApiTags('Gastos por Viaje')
@Controller('gastoxviaje')
export class GastoxviajeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los gastos por viaje' })
  @ApiResponse({ status: 200, description: 'Gastos por viaje obtenidos exitosamente' })
  async getAll() {
    return this.queryBus.execute(new GetAllGastosXViajeCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener gasto por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto por viaje no encontrado' })
  async getById(@Query('id') id: number) {
    return this.queryBus.execute(new GetGastoXViajeByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo gasto por viaje' })
  @ApiResponse({ status: 201, description: 'Gasto por viaje creado exitosamente' })
  async create(@Body() dto: CreateGastoXViajeDto) {
    const command = new CreateGastoXViajeCommand(
      dto.fk_viaje, dto.fk_gasto, dto.valor, dto.detalles,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un gasto por viaje existente' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje actualizado exitosamente' })
  async update(@Body() dto: UpdateGastoXViajeDto) {
    const command = new UpdateGastoXViajeCommand(
      dto.id_gastoxviaje, dto.fk_viaje, dto.fk_gasto, dto.valor, dto.detalles,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un gasto por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje eliminado exitosamente' })
  async delete(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteGastoXViajeCommand(id));
  }

  @Get('getGastosByViaje')
  @ApiOperation({ summary: 'Obtener gastos por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gastos por viaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gastos por viaje no encontrado' })
  async getGastosByViaje(@Query('fk_viaje') fk_viaje: number) {
    return this.queryBus.execute(new GetGastosByViajeCommand(fk_viaje));
  }
}
