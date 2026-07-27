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

/**
 * Controlador REST para Remesa.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Remesas')
@Controller('remesas')
export class RemesaController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllRemesas.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todas las remesas' })
  @ApiResponse({ status: 200, description: 'Remesas obtenidas exitosamente' })
  async getAllRemesas() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllRemesasCommand());
    }

  /**
     * Endpoint para la operación de getRemesaById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener remesa por ID' })
  @ApiResponse({ status: 200, description: 'Remesa encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Remesa no encontrada' })
  async getRemesaById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetRemesaByIdCommand(id));
    }

  /**
     * Endpoint para la operación de getRemesasByViaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_viaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByViaje')
  @ApiOperation({ summary: 'Obtener remesas por viaje' })
  @ApiResponse({ status: 200, description: 'Remesas encontradas exitosamente' })
  @ApiResponse({ status: 404, description: 'Remesas no encontradas' })
  async getRemesasByViaje(@Query('fk_viaje') fk_viaje: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetRemesasByViajeCommand(fk_viaje));
    }

  /**
     * Endpoint para la operación de createRemesa.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear una nueva remesa' })
  @ApiResponse({ status: 201, description: 'Remesa creada exitosamente' })
  async createRemesa(@Body() dto: CreateRemesaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
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
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateRemesa.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar una remesa existente' })
  @ApiResponse({ status: 200, description: 'Remesa actualizada exitosamente' })
  async updateRemesa(@Body() dto: UpdateRemesaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateRemesaCommand(
          dto.id_remesa,
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
          dto.id_mercancia,
          dto.codigo_un,
          dto.grupo_riesgo,
          dto.caracteristica_peligrosidad,
          dto.embalaje_envase,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteRemesa.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una remesa por ID' })
  @ApiResponse({ status: 200, description: 'Remesa eliminada exitosamente' })
  async deleteRemesa(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteRemesaCommand(id));
    }
}
