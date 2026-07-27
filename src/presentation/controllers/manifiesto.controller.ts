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
import { UpdateTotalGastosCommand } from 'src/application/manifiesto/commands/update-total-gastos.command';

/**
 * Controlador REST para Manifiesto.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Manifiestos')
@Controller('manifiestos')
export class ManifiestoController {
    /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    /**
     * Endpoint para la operación de getAll.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
    @ApiOperation({ summary: 'Obtener todos los manifiestos' })
    @ApiResponse({ status: 200, description: 'Manifiestos obtenidos exitosamente' })
    async getAll() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllManifiestosCommand());
    }

    /**
     * Endpoint para la operación de getById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
    @ApiOperation({ summary: 'Obtener manifiesto por ID' })
    @ApiResponse({ status: 200, description: 'Manifiesto encontrado exitosamente' })
    @ApiResponse({ status: 404, description: 'Manifiesto no encontrado' })
    async getById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetManifiestoByIdCommand(id));
    }

    /**
     * Endpoint para la operación de createManifiesto.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
    @ApiOperation({ summary: 'Crear un nuevo manifiesto' })
    @ApiResponse({ status: 201, description: 'Manifiesto creado exitosamente' })
    async createManifiesto(@Body() dto: CreateManifiestoDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateManifiestoCommand(
            dto.fk_vehiculo,
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
            dto.ganancia_conductor,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

    /**
     * Endpoint para la operación de updateManifiesto.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
    @ApiOperation({ summary: 'Actualizar un manifiesto existente' })
    @ApiResponse({ status: 200, description: 'Manifiesto actualizado exitosamente' })
    async updateManifiesto(@Body() dto: UpdateManifiestoDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateManifiestoCommand(
            dto.id_manifiesto,
            dto.fk_vehiculo,
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
            dto.ganancia_conductor,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

    /**
     * Endpoint para la operación de delete.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
    @ApiOperation({ summary: 'Eliminar un manifiesto por ID' })
    @ApiResponse({ status: 200, description: 'Manifiesto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Manifiesto no encontrado' })
    async delete(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteManifiestoCommand(id));
    }

    /**
     * Endpoint para la operación de updateTotalGastos.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_viaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('updateTotalGastos')
    @ApiOperation({ summary: 'Actualizar el total de gastos en el manifiesto asociado a un viaje' })
    @ApiResponse({ status: 200, description: 'Total de gastos actualizado correctamente' })
    @ApiResponse({ status: 404, description: 'Viaje o manifiesto no encontrado' })
    async updateTotalGastos(@Query('fk_viaje') fk_viaje: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new UpdateTotalGastosCommand(fk_viaje));
    }

}
