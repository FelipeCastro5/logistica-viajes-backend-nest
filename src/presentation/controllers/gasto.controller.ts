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

/**
 * Controlador REST para Gasto.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Gastos')
@Controller('gastos')
export class GastoController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllGastos.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los gastos' })
  @ApiResponse({ status: 200, description: 'Gastos obtenidos exitosamente' })
  async getAllGastos() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllGastosCommand());
    }

  /**
     * Endpoint para la operación de getGastoById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async getGastoById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetGastoByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createGasto.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo gasto' })
  @ApiResponse({ status: 201, description: 'Gasto creado exitosamente' })
  async createGasto(@Body() dto: CreateGastoDto) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new CreateGastoCommand(dto.nombre_gasto));
    }

  /**
     * Endpoint para la operación de updateGasto.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un gasto' })
  @ApiResponse({ status: 200, description: 'Gasto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async updateGasto(@Body() dto: UpdateGastoDto) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new UpdateGastoCommand(dto.id, dto.nombre_gasto));
    }

  /**
     * Endpoint para la operación de deleteGasto.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un gasto por ID' })
  @ApiResponse({ status: 200, description: 'Gasto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado' })
  async deleteGasto(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteGastoCommand(id));
    }
}
