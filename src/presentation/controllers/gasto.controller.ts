import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateGastoCommand } from '../../application/gasto/commands/create-gasto.command';
import { UpdateGastoCommand } from '../../application/gasto/commands/update-gasto.command';
import { DeleteGastoCommand } from '../../application/gasto/commands/delete-gasto.command';
import { GetAllGastosCommand } from '../../application/gasto/commands/get-all-gastos.command';
import { GetGastoByIdCommand } from '../../application/gasto/commands/get-gasto-by-id.command';

import { CreateGastoDto } from '../dtos/gasto/create-gasto.dto';
import { UpdateGastoDto } from '../dtos/gasto/update-gasto.dto';

@ApiTags('Gastos')
@Controller('gastos')
export class GastoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los gastos' })
  @ApiResponse({ status: 200, description: 'Gastos obtenidos exitosamente' })
  async getAllGastos() {
    return this.queryBus.execute(new GetAllGastosCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async getGastoById(@Query('id') id: number) {
    return this.queryBus.execute(new GetGastoByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo gasto' })
  @ApiResponse({ status: 201, description: 'Gasto creado exitosamente' })
  async createGasto(@Body() dto: CreateGastoDto) {
    return this.commandBus.execute(new CreateGastoCommand(dto.nombre_gasto));
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un gasto' })
  @ApiResponse({ status: 200, description: 'Gasto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async updateGasto(@Body() dto: UpdateGastoDto) {
    return this.commandBus.execute(new UpdateGastoCommand(dto.id, dto.nombre_gasto));
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async deleteGasto(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteGastoCommand(id));
  }
}
