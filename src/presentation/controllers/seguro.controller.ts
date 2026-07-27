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


/**
 * Controlador REST para Seguro.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Seguros')
@Controller('seguros')
export class SeguroController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllSeguros.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los seguros' })
  @ApiResponse({ status: 200, description: 'Seguros obtenidos exitosamente' })
  async getAllSeguros() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllSegurosCommand());
    }

  /**
     * Endpoint para la operación de getSeguroById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener seguro por ID' })
  @ApiResponse({ status: 200, description: 'Seguro encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Seguro no encontrado' })
  async getSeguroById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetSeguroByIdCommand(id));
    }

  /**
     * Endpoint para la operación de getSegurosByVehiculo.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_vehiculo Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByVehiculo')
  @ApiOperation({ summary: 'Obtener seguros por vehículo' })
  @ApiResponse({ status: 200, description: 'Seguros encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Seguros no encontrados' })
  async getSegurosByVehiculo(@Query('fk_vehiculo') fk_vehiculo: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(
          new GetSegurosByVehiculoCommand(fk_vehiculo),
        );
    }

  /**
     * Endpoint para la operación de createSeguro.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo seguro' })
  @ApiResponse({ status: 201, description: 'Seguro creado exitosamente' })
  async createSeguro(@Body() dto: CreateSeguroDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateSeguroCommand(
          dto.fk_vehiculo,
          dto.tipo_seguro,
          dto.numero_poliza,
          dto.aseguradora,
          dto.fecha_vencimiento,
          dto.valor,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateSeguro.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un seguro existente' })
  @ApiResponse({ status: 200, description: 'Seguro actualizado exitosamente' })
  async updateSeguro(@Body() dto: UpdateSeguroDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateSeguroCommand(
          dto.id,
          dto.fk_vehiculo,
          dto.tipo_seguro,
          dto.numero_poliza,
          dto.aseguradora,
          dto.fecha_vencimiento,
          dto.valor,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteSeguro.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un seguro por ID' })
  @ApiResponse({ status: 200, description: 'Seguro eliminado exitosamente' })
  async deleteSeguro(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteSeguroCommand(id));
    }
}
