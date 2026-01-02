import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFirmaCommand } from '../../application/firma/commands/create-firma.command';
import { UpdateFirmaCommand } from '../../application/firma/commands/update-firma.command';
import { DeleteFirmaCommand } from '../../application/firma/commands/delete-firma.command';
import { GetAllFirmasCommand } from '../../application/firma/commands/get-all-firmas.command';
import { GetFirmaByIdCommand } from '../../application/firma/commands/get-firma-by-id.command';
import { GetFirmasByViajeCommand } from '../../application/firma/commands/get-firmas-by-viaje.command';

import { CreateFirmaDto } from '../dtos/firma/create-firma.dto';
import { UpdateFirmaDto } from '../dtos/firma/update-firma.dto';

@ApiTags('Firmas')
@Controller('firmas')
export class FirmaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todas las firmas' })
  @ApiResponse({ status: 200, description: 'Firmas obtenidas exitosamente' })
  async getAllFirmas() {
    return this.queryBus.execute(new GetAllFirmasCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener firma por ID' })
  @ApiResponse({ status: 200, description: 'Firma encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Firma no encontrada' })
  async getFirmaById(@Query('id') id: number) {
    return this.queryBus.execute(new GetFirmaByIdCommand(id));
  }

  @Get('getByViaje')
  @ApiOperation({ summary: 'Obtener firmas por viaje' })
  @ApiResponse({ status: 200, description: 'Firmas encontradas exitosamente' })
  @ApiResponse({ status: 404, description: 'Firmas no encontradas' })
  async getFirmasByViaje(@Query('fk_viaje') fk_viaje: number) {
    return this.queryBus.execute(new GetFirmasByViajeCommand(fk_viaje));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva firma' })
  @ApiResponse({ status: 201, description: 'Firma creada exitosamente' })
  async createFirma(@Body() dto: CreateFirmaDto) {
    const command = new CreateFirmaCommand(
      dto.fk_viaje,
      dto.tipo_firma,
      dto.firma_digital,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar una firma existente' })
  @ApiResponse({ status: 200, description: 'Firma actualizada exitosamente' })
  async updateFirma(@Body() dto: UpdateFirmaDto) {
    const command = new UpdateFirmaCommand(
      dto.id,
      dto.fk_viaje,
      dto.tipo_firma,
      dto.firma_digital,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una firma por ID' })
  @ApiResponse({ status: 200, description: 'Firma eliminada exitosamente' })
  async deleteFirma(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteFirmaCommand(id));
  }
}
