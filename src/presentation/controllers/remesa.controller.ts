import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateRemesaCommand } from '../../application/remesa/commands/create-remesa.command';
import { UpdateRemesaCommand } from '../../application/remesa/commands/update-remesa.command';
import { DeleteRemesaCommand } from '../../application/remesa/commands/delete-remesa.command';
import { GetAllRemesasCommand } from '../../application/remesa/commands/get-all-remesas.command';
import { GetRemesaByIdCommand } from '../../application/remesa/commands/get-remesa-by-id.command';
import { GetRemesasByViajeCommand } from '../../application/remesa/commands/get-remesas-by-viaje.command';

import { CreateRemesaDto } from '../dtos/remesa/create-remesa.dto';
import { UpdateRemesaDto } from '../dtos/remesa/update-remesa.dto';

@ApiTags('Remesas')
@Controller('remesas')
export class RemesaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todas las remesas' })
  @ApiResponse({ status: 200, description: 'Remesas obtenidas exitosamente' })
  async getAllRemesas() {
    return this.queryBus.execute(new GetAllRemesasCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener remesa por ID' })
  @ApiResponse({ status: 200, description: 'Remesa encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Remesa no encontrada' })
  async getRemesaById(@Query('id') id: number) {
    return this.queryBus.execute(new GetRemesaByIdCommand(id));
  }

  @Get('getByViaje')
  @ApiOperation({ summary: 'Obtener remesas por viaje' })
  @ApiResponse({ status: 200, description: 'Remesas encontradas exitosamente' })
  @ApiResponse({ status: 404, description: 'Remesas no encontradas' })
  async getRemesasByViaje(@Query('fk_viaje') fk_viaje: number) {
    return this.queryBus.execute(new GetRemesasByViajeCommand(fk_viaje));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva remesa' })
  @ApiResponse({ status: 201, description: 'Remesa creada exitosamente' })
  async createRemesa(@Body() dto: CreateRemesaDto) {
    const command = new CreateRemesaCommand(
      dto.fk_viaje,
      dto.numero_remesa,
      dto.numero_autorizacion,
      dto.tipo_empaque,
      dto.naturaleza_carga,
      dto.codigo_armonizado,
      dto.cantidad,
      dto.unidad_medida,
      dto.peso_total,
      dto.mercancia_peligrosa,
      dto.observaciones,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar una remesa existente' })
  @ApiResponse({ status: 200, description: 'Remesa actualizada exitosamente' })
  async updateRemesa(@Body() dto: UpdateRemesaDto) {
    const command = new UpdateRemesaCommand(
      dto.id,
      dto.fk_viaje,
      dto.numero_remesa,
      dto.numero_autorizacion,
      dto.tipo_empaque,
      dto.naturaleza_carga,
      dto.codigo_armonizado,
      dto.cantidad,
      dto.unidad_medida,
      dto.peso_total,
      dto.mercancia_peligrosa,
      dto.observaciones,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una remesa por ID' })
  @ApiResponse({ status: 200, description: 'Remesa eliminada exitosamente' })
  async deleteRemesa(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteRemesaCommand(id));
  }
}
