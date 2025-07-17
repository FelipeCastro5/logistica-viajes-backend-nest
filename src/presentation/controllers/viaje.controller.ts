import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateViajeCommand } from '../../application/viaje/commands/create-viaje.command';
import { UpdateViajeCommand } from '../../application/viaje/commands/update-viaje.command';
import { DeleteViajeCommand } from '../../application/viaje/commands/delete-viaje.command';
import { GetAllViajesCommand } from '../../application/viaje/commands/get-all-viajes.command';
import { GetViajeByIdCommand } from '../../application/viaje/commands/get-viaje-by-id.command';
import { CreateNewViajeCommand } from '../../application/viaje/commands/create-new-viaje.command';

import { CreateViajeDto } from '../dtos/viaje/create-viaje.dto';
import { UpdateViajeDto } from '../dtos/viaje/update-viaje.dto';
import { GetViajesPaginatedByUsuarioCommand } from '../../application/viaje/commands/get-viajes-paginated-by-usuario.command';
import { CreateNewViajeDto } from '../dtos/viaje/create-new-viaje.dto';

@ApiTags('Viajes')
@Controller('viajes')
export class ViajeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los viajes' })
  @ApiResponse({ status: 200, description: 'Viajes obtenidos exitosamente' })
  async getAllViajes() {
    return this.queryBus.execute(new GetAllViajesCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener un viaje por ID' })
  @ApiResponse({ status: 200, description: 'Viaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  async getViajeById(@Query('id') id: number) {
    return this.queryBus.execute(new GetViajeByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo viaje' })
  @ApiResponse({ status: 201, description: 'Viaje creado exitosamente' })
  async createViaje(@Body() dto: CreateViajeDto) {
    const command = new CreateViajeCommand(
      dto.fk_usuario,
      dto.fk_manifiesto,
      dto.fk_cliente,
      dto.fk_origen,
      dto.fk_destino,
      dto.codigo,
      dto.observaciones,
      dto.estado_viaje,
      dto.producto,
      dto.detalle_producto,
      dto.direccion_llegada,
      dto.fecha_salida,
      dto.fecha_llegada,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un viaje existente' })
  @ApiResponse({ status: 200, description: 'Viaje actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  async updateViaje(@Body() dto: UpdateViajeDto) {
    const command = new UpdateViajeCommand(
      dto.id_viaje,
      dto.fk_usuario,
      dto.fk_manifiesto,
      dto.fk_cliente,
      dto.fk_origen,
      dto.fk_destino,
      dto.codigo,
      dto.observaciones,
      dto.estado_viaje,
      dto.producto,
      dto.detalle_producto,
      dto.direccion_llegada,
      dto.fecha_salida,
      dto.fecha_llegada,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un viaje por ID' })
  @ApiResponse({ status: 200, description: 'Viaje eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Viaje no encontrado' })
  async deleteViaje(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteViajeCommand(id));
  }

  @Get('paginatedByUsuario')
  @ApiOperation({ summary: 'Obtener viajes paginados por usuario' })
  @ApiResponse({ status: 200, description: 'Viajes paginados obtenidos exitosamente' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  async getViajesPaginatedByUsuario(
    @Query('id_usuario') id_usuario: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.queryBus.execute(
      new GetViajesPaginatedByUsuarioCommand(id_usuario, page, limit),
    );
  }
  @Post('createNewViaje')
  @ApiOperation({ summary: 'Crear un nuevo viaje' })
  @ApiResponse({ status: 201, description: 'Viaje creado exitosamente' })
  async createNewViaje(@Body() dto: CreateNewViajeDto) {
    const command = new CreateNewViajeCommand(
      dto.fk_usuario,
      dto.fk_cliente,
      dto.fk_origen,
      dto.fk_destino,
      dto.codigo,
      dto.observaciones,
      dto.producto,
      dto.detalle_producto,
      dto.direccion_llegada,
      dto.fecha_salida,
      dto.fecha_llegada,
      // manifiesto
      dto.flete_total,
      dto.porcentaje_retencion_fuente,
      dto.valor_retencion_fuente,
      dto.porcentaje_ica,
      dto.valor_ica,
      dto.deduccion_fiscal,
      dto.neto_a_pagar,
      dto.anticipo,
      dto.saldo_a_pagar,
      dto.total_gastos,
      dto.queda_al_carro,
      dto.a_favor_del_carro,
      dto.porcentaje_conductor,
      dto.ganacia_conductor,
    );

    return this.commandBus.execute(command);
  }

}