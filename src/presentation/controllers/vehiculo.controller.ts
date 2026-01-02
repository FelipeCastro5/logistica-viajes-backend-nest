import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateVehiculoCommand } from '../../application/vehiculo/commands/create-vehiculo.command';
import { UpdateVehiculoCommand } from '../../application/vehiculo/commands/update-vehiculo.command';
import { DeleteVehiculoCommand } from '../../application/vehiculo/commands/delete-vehiculo.command';
import { GetAllVehiculosCommand } from '../../application/vehiculo/commands/get-all-vehiculos.command';
import { GetVehiculoByIdCommand } from '../../application/vehiculo/commands/get-vehiculo-by-id.command';
import { GetVehiculosByUsuarioCommand } from '../../application/vehiculo/commands/get-vehiculos-by-usuario.command';
import { CreateVehiculoDto } from '../dtos/vehiculo/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dtos/vehiculo/update-vehiculo.dto';


@ApiTags('Vehiculos')
@Controller('vehiculos')
export class VehiculoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los vehículos' })
  @ApiResponse({ status: 200, description: 'Vehículos obtenidos exitosamente' })
  async getAllVehiculos() {
    return this.queryBus.execute(new GetAllVehiculosCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener vehículo por ID' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async getVehiculoById(@Query('id') id: number) {
    return this.queryBus.execute(new GetVehiculoByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo vehículo' })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente' })
  async createVehiculo(@Body() dto: CreateVehiculoDto) {
    const command = new CreateVehiculoCommand(
      dto.fk_usuario,
      dto.placa,
      dto.marca,
      dto.configuracion,
      dto.tipo_vehiculo,
      dto.peso_vacio,
      dto.peso_remolque,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un vehículo existente' })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado exitosamente' })
  async updateVehiculo(@Body() dto: UpdateVehiculoDto) {
    const command = new UpdateVehiculoCommand(
      dto.id,
      dto.fk_usuario,
      dto.placa,
      dto.marca,
      dto.configuracion,
      dto.tipo_vehiculo,
      dto.peso_vacio,
      dto.peso_remolque,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un vehículo por ID' })
  @ApiResponse({ status: 200, description: 'Vehículo eliminado exitosamente' })
  async deleteVehiculo(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteVehiculoCommand(id));
  }

  @Get('getByUsuario')
  @ApiOperation({ summary: 'Obtener vehículos por usuario' })
  @ApiResponse({ status: 200, description: 'Vehículos encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículos no encontrados' })
  async getVehiculosByUsuario(@Query('fk_usuario') fk_usuario: number) {
    return this.queryBus.execute(
      new GetVehiculosByUsuarioCommand(fk_usuario),
    );
  }
}
