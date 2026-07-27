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

/**
 * Controlador REST para Firma.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Firmas')
@Controller('firmas')
export class FirmaController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllFirmas.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todas las firmas' })
  @ApiResponse({ status: 200, description: 'Firmas obtenidas exitosamente' })
  async getAllFirmas() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllFirmasCommand());
    }

  /**
     * Endpoint para la operación de getFirmaById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener firma por ID' })
  @ApiResponse({ status: 200, description: 'Firma encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Firma no encontrada' })
  async getFirmaById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetFirmaByIdCommand(id));
    }

  /**
     * Endpoint para la operación de getFirmasByViaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_viaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByViaje')
  @ApiOperation({ summary: 'Obtener firmas por viaje' })
  @ApiResponse({ status: 200, description: 'Firmas encontradas exitosamente' })
  @ApiResponse({ status: 404, description: 'Firmas no encontradas' })
  async getFirmasByViaje(@Query('fk_viaje') fk_viaje: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetFirmasByViajeCommand(fk_viaje));
    }

  /**
     * Endpoint para la operación de createFirma.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear una nueva firma' })
  @ApiResponse({ status: 201, description: 'Firma creada exitosamente' })
  async createFirma(@Body() dto: CreateFirmaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateFirmaCommand(
          dto.fk_viaje,
          dto.tipo_firma,
          dto.firma_digital,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateFirma.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar una firma existente' })
  @ApiResponse({ status: 200, description: 'Firma actualizada exitosamente' })
  async updateFirma(@Body() dto: UpdateFirmaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateFirmaCommand(
          dto.id,
          dto.fk_viaje,
          dto.tipo_firma,
          dto.firma_digital,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteFirma.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una firma por ID' })
  @ApiResponse({ status: 200, description: 'Firma eliminada exitosamente' })
  async deleteFirma(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteFirmaCommand(id));
    }
}
