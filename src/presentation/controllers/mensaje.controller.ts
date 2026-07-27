import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateMensajeCommand } from '../../application/mensaje/commands/create-mensaje.command';
import { UpdateMensajeCommand } from '../../application/mensaje/commands/update-mensaje.command';
import { DeleteMensajeCommand } from '../../application/mensaje/commands/delete-mensaje.command';
import { GetAllMensajesCommand } from '../../application/mensaje/commands/get-all-mensajes.command';
import { GetMensajeByIdCommand } from '../../application/mensaje/commands/get-mensaje-by-id.command';

import { CreateMensajeDto } from '../dtos/mensaje/create-mensaje.dto';
import { UpdateMensajeDto } from '../dtos/mensaje/update-mensaje.dto';

/**
 * Controlador REST para Mensaje.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Mensajes')
@Controller('mensajes')
export class MensajeController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllMensajes.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los mensajes' })
  @ApiResponse({ status: 200, description: 'Mensajes obtenidos exitosamente' })
  async getAllMensajes() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllMensajesCommand());
    }

  /**
     * Endpoint para la operación de getMensajeById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByChat')
  @ApiOperation({ summary: 'Obtener mensaje por ID' })
  @ApiResponse({ status: 200, description: 'Mensajes encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensajes no encontrado' })
  async getMensajeById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetMensajeByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createMensaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo mensaje' })
  @ApiResponse({ status: 201, description: 'Mensaje creado exitosamente' })
  async createMensaje(@Body() dto: CreateMensajeDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateMensajeCommand(
          dto.fk_chat,
          dto.pregunta,
          dto.respuesta,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateMensaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un mensaje existente' })
  @ApiResponse({ status: 200, description: 'Mensaje actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async updateMensaje(@Body() dto: UpdateMensajeDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateMensajeCommand(
          dto.id,
          dto.fk_chat,
          dto.pregunta,
          dto.respuesta,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteMensaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un mensaje por ID' })
  @ApiResponse({ status: 200, description: 'Mensaje eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async deleteMensaje(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteMensajeCommand(id));
    }
}
