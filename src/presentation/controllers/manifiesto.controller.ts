import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateManifiestoCommand } from '../../application/manifiesto/commands/create-manifiesto.command';
import { UpdateManifiestoCommand } from '../../application/manifiesto/commands/update-manifiesto.command';
import { DeleteManifiestoCommand } from '../../application/manifiesto/commands/delete-manifiesto.command';
import { GetAllManifiestosCommand } from '../../application/manifiesto/commands/get-all-manifiestos.command';
import { GetManifiestoByIdCommand } from '../../application/manifiesto/commands/get-manifiesto-by-id.command';

import { CreateManifiestoDto } from '../dtos/manifiesto/create-manifiesto.dto';
import { UpdateManifiestoDto } from '../dtos/manifiesto/update-manifiesto.dto';

@ApiTags('Manifiestos')
@Controller('manifiestos')
export class ManifiestoController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get('getAll')
    @ApiOperation({ summary: 'Obtener todos los manifiestos' })
    @ApiResponse({ status: 200, description: 'Manifiestos obtenidos exitosamente' })
    async getAll() {
        return this.queryBus.execute(new GetAllManifiestosCommand());
    }

    @Get('getById')
    @ApiOperation({ summary: 'Obtener manifiesto por ID' })
    @ApiResponse({ status: 200, description: 'Manifiesto encontrado exitosamente' })
    @ApiResponse({ status: 404, description: 'Manifiesto no encontrado' })
    async getById(@Query('id') id: number) {
        return this.queryBus.execute(new GetManifiestoByIdCommand(id));
    }

    @Post('create')
    @ApiOperation({ summary: 'Crear un nuevo manifiesto' })
    @ApiResponse({ status: 201, description: 'Manifiesto creado exitosamente' })
    async createManifiesto(@Body() dto: CreateManifiestoDto) {
        const command = new CreateManifiestoCommand(
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

    @Put('update')
    @ApiOperation({ summary: 'Actualizar un manifiesto existente' })
    @ApiResponse({ status: 200, description: 'Manifiesto actualizado exitosamente' })
    async updateManifiesto(@Body() dto: UpdateManifiestoDto) {
        const command = new UpdateManifiestoCommand(
            dto.id,
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

    @Delete('delete')
    @ApiOperation({ summary: 'Eliminar un manifiesto por ID' })
    @ApiResponse({ status: 200, description: 'Manifiesto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Manifiesto no encontrado' })
    async delete(@Query('id') id: number) {
        return this.commandBus.execute(new DeleteManifiestoCommand(id));
    }
}
