import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateLugarCommand } from '../../application/lugar/commands/create-lugar.command';
import { UpdateLugarCommand } from '../../application/lugar/commands/update-lugar.command';
import { DeleteLugarCommand } from '../../application/lugar/commands/delete-lugar.command';
import { GetAllLugaresCommand } from '../../application/lugar/commands/get-all-lugares.command';
import { GetLugarByIdCommand } from '../../application/lugar/commands/get-lugar-by-id.command';

import { CreateLugarDto } from '../dtos/lugar/create-lugar.dto';
import { UpdateLugarDto } from '../dtos/lugar/update-lugar.dto';

/**
 * Controlador REST para Lugar.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Lugares')
@Controller('lugares')
export class LugarController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllLugares.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los lugares' })
  @ApiResponse({ status: 200, description: 'Lugares obtenidos exitosamente' })
  async getAllLugares() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllLugaresCommand());
    }

  /**
     * Endpoint para la operación de getLugarById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async getLugarById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetLugarByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createLugar.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo lugar' })
  @ApiResponse({ status: 201, description: 'Lugar creado exitosamente' })
  async createLugar(@Body() dto: CreateLugarDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateLugarCommand(dto.nombre_lugar);
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateLugar.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un lugar existente' })
  @ApiResponse({ status: 200, description: 'Lugar actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async updateLugar(@Body() dto: UpdateLugarDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateLugarCommand(dto.id, dto.nombre_lugar);
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteLugar.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un lugar por ID' })
  @ApiResponse({ status: 200, description: 'Lugar eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lugar no encontrado' })
  async deleteLugar(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteLugarCommand(id));
    }
}
