import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateMercanciaPeligrosaCommand } from '../../application/mercancia-peligrosa/commands/create-mercancia-peligrosa.command';
import { UpdateMercanciaPeligrosaCommand } from '../../application/mercancia-peligrosa/commands/update-mercancia-peligrosa.command';
import { DeleteMercanciaPeligrosaCommand } from '../../application/mercancia-peligrosa/commands/delete-mercancia-peligrosa.command';
import { GetAllMercanciaPeligrosaCommand } from '../../application/mercancia-peligrosa/commands/get-all-mercancia-peligrosa.command';
import { GetMercanciaPeligrosaByIdCommand } from '../../application/mercancia-peligrosa/commands/get-mercancia-peligrosa-by-id.command';
import { GetMercanciaPeligrosaByRemesaCommand } from '../../application/mercancia-peligrosa/commands/get-mercancia-peligrosa-by-remesa.command';

import { CreateMercanciaPeligrosaDto } from '../dtos/mercancia-peligrosa/create-mercancia-peligrosa.dto';
import { UpdateMercanciaPeligrosaDto } from '../dtos/mercancia-peligrosa/update-mercancia-peligrosa.dto';

@ApiTags('Mercancía Peligrosa')
@Controller('mercancia-peligrosa')
export class MercanciaPeligrosaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener toda la mercancía peligrosa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa obtenida exitosamente',
  })
  async getAll() {
    return this.queryBus.execute(new GetAllMercanciaPeligrosaCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener mercancía peligrosa por ID' })
  @ApiResponse({ status: 200, description: 'Mercancía encontrada' })
  @ApiResponse({ status: 404, description: 'Mercancía no encontrada' })
  async getById(@Query('id') id: number) {
    return this.queryBus.execute(
      new GetMercanciaPeligrosaByIdCommand(id),
    );
  }

  @Get('getByRemesa')
  @ApiOperation({ summary: 'Obtener mercancía peligrosa por remesa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa obtenida exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Mercancía no encontrada' })
  async getByRemesa(@Query('fk_remesa') fk_remesa: number) {
    return this.queryBus.execute(
      new GetMercanciaPeligrosaByRemesaCommand(fk_remesa),
    );
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear mercancía peligrosa' })
  @ApiResponse({
    status: 201,
    description: 'Mercancía peligrosa creada exitosamente',
  })
  async create(@Body() dto: CreateMercanciaPeligrosaDto) {
    const command = new CreateMercanciaPeligrosaCommand(
      dto.fk_remesa,
      dto.codigo_un,
      dto.grupo_riesgo,
      dto.caracteristica_peligrosidad,
      dto.embalaje_envase,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar mercancía peligrosa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa actualizada exitosamente',
  })
  async update(@Body() dto: UpdateMercanciaPeligrosaDto) {
    const command = new UpdateMercanciaPeligrosaCommand(
      dto.id,
      dto.fk_remesa,
      dto.codigo_un,
      dto.grupo_riesgo,
      dto.caracteristica_peligrosidad,
      dto.embalaje_envase,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar mercancía peligrosa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa eliminada exitosamente',
  })
  async delete(@Query('id') id: number) {
    return this.commandBus.execute(
      new DeleteMercanciaPeligrosaCommand(id),
    );
  }
}
