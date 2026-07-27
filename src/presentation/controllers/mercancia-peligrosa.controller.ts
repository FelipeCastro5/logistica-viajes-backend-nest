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

/**
 * Controlador REST para MercanciaPeligrosa.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Mercancía Peligrosa')
@Controller('mercancia-peligrosa')
export class MercanciaPeligrosaController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAll.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener toda la mercancía peligrosa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa obtenida exitosamente',
  })
  async getAll() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllMercanciaPeligrosaCommand());
    }

  /**
     * Endpoint para la operación de getById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener mercancía peligrosa por ID' })
  @ApiResponse({ status: 200, description: 'Mercancía encontrada' })
  @ApiResponse({ status: 404, description: 'Mercancía no encontrada' })
  async getById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(
          new GetMercanciaPeligrosaByIdCommand(id),
        );
    }

  /**
     * Endpoint para la operación de getByRemesa.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_remesa Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByRemesa')
  @ApiOperation({ summary: 'Obtener mercancía peligrosa por remesa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa obtenida exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Mercancía no encontrada' })
  async getByRemesa(@Query('fk_remesa') fk_remesa: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(
          new GetMercanciaPeligrosaByRemesaCommand(fk_remesa),
        );
    }

  /**
     * Endpoint para la operación de create.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear mercancía peligrosa' })
  @ApiResponse({
    status: 201,
    description: 'Mercancía peligrosa creada exitosamente',
  })
  async create(@Body() dto: CreateMercanciaPeligrosaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateMercanciaPeligrosaCommand(
          dto.fk_remesa,
          dto.codigo_un,
          dto.grupo_riesgo,
          dto.caracteristica_peligrosidad,
          dto.embalaje_envase,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de update.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar mercancía peligrosa' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa actualizada exitosamente',
  })
  async update(@Body() dto: UpdateMercanciaPeligrosaDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateMercanciaPeligrosaCommand(
          dto.id,
          dto.fk_remesa,
          dto.codigo_un,
          dto.grupo_riesgo,
          dto.caracteristica_peligrosidad,
          dto.embalaje_envase,
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
  @ApiOperation({ summary: 'Eliminar mercancía peligrosa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mercancía peligrosa eliminada exitosamente',
  })
  async delete(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(
          new DeleteMercanciaPeligrosaCommand(id),
        );
    }
}
