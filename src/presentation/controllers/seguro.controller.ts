import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateSeguroCommand } from '../../application/seguro/commands/create-seguro.command';
import { UpdateSeguroCommand } from '../../application/seguro/commands/update-seguro.command';
import { DeleteSeguroCommand } from '../../application/seguro/commands/delete-seguro.command';
import { GetAllSegurosCommand } from '../../application/seguro/commands/get-all-seguros.command';
import { GetSeguroByIdCommand } from '../../application/seguro/commands/get-seguro-by-id.command';
import { GetSegurosByVehiculoCommand } from '../../application/seguro/commands/get-seguros-by-vehiculo.command';
import { CreateSeguroDto } from '../dtos/seguro/create-seguro.dto';
import { UpdateSeguroDto } from '../dtos/seguro/update-seguro.dto';


@ApiTags('Seguros')
@Controller('seguros')
export class SeguroController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los seguros' })
  @ApiResponse({ status: 200, description: 'Seguros obtenidos exitosamente' })
  async getAllSeguros() {
    return this.queryBus.execute(new GetAllSegurosCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener seguro por ID' })
  @ApiResponse({ status: 200, description: 'Seguro encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Seguro no encontrado' })
  async getSeguroById(@Query('id') id: number) {
    return this.queryBus.execute(new GetSeguroByIdCommand(id));
  }

  @Get('getByVehiculo')
  @ApiOperation({ summary: 'Obtener seguros por vehículo' })
  @ApiResponse({ status: 200, description: 'Seguros encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Seguros no encontrados' })
  async getSegurosByVehiculo(@Query('fk_vehiculo') fk_vehiculo: number) {
    return this.queryBus.execute(
      new GetSegurosByVehiculoCommand(fk_vehiculo),
    );
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo seguro' })
  @ApiResponse({ status: 201, description: 'Seguro creado exitosamente' })
  async createSeguro(@Body() dto: CreateSeguroDto) {
    const command = new CreateSeguroCommand(
      dto.fk_vehiculo,
      dto.tipo_seguro,
      dto.numero_poliza,
      dto.aseguradora,
      dto.fecha_vencimiento,
      dto.valor,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un seguro existente' })
  @ApiResponse({ status: 200, description: 'Seguro actualizado exitosamente' })
  async updateSeguro(@Body() dto: UpdateSeguroDto) {
    const command = new UpdateSeguroCommand(
      dto.id,
      dto.fk_vehiculo,
      dto.tipo_seguro,
      dto.numero_poliza,
      dto.aseguradora,
      dto.fecha_vencimiento,
      dto.valor,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un seguro por ID' })
  @ApiResponse({ status: 200, description: 'Seguro eliminado exitosamente' })
  async deleteSeguro(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteSeguroCommand(id));
  }
}
