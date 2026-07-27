import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateChatCommand } from '../../application/chat/commands/create-chat.command';
import { UpdateChatCommand } from '../../application/chat/commands/update-chat.command';
import { DeleteChatCommand } from '../../application/chat/commands/delete-chat.command';
import { GetAllChatsCommand } from '../../application/chat/commands/get-all-chats.command';
import { GetChatByIdCommand } from '../../application/chat/commands/get-chat-by-id.command';

import { CreateChatDto } from '../dtos/chat/create-chat.dto';
import { UpdateChatDto } from '../dtos/chat/update-chat.dto';

/**
 * Controlador REST para Chat.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllChats.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los chats' })
  @ApiResponse({ status: 200, description: 'Chats obtenidos exitosamente' })
  async getAllChats() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllChatsCommand());
    }

  /**
     * Endpoint para la operación de getChatById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByUsuario')
  @ApiOperation({ summary: 'Obtener chat por ID' })
  @ApiResponse({ status: 200, description: 'Chats encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chats no encontrado' })
  async getChatById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetChatByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createChat.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo chat' })
  @ApiResponse({ status: 201, description: 'Chat creado exitosamente' })
  async createChat(@Body() dto: CreateChatDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateChatCommand(
          dto.fk_usuario,
          dto.nombre_chat,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateChat.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un chat existente' })
  @ApiResponse({ status: 200, description: 'Chat actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado' })
  async updateChat(@Body() dto: UpdateChatDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateChatCommand(
          dto.id_chat,
          dto.fk_usuario,
          dto.nombre_chat,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteChat.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id_chat Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un chat por ID' })
  @ApiResponse({ status: 200, description: 'Chat eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado' })
  async deleteChat(@Query('id_chat') id_chat: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteChatCommand(id_chat));
    }
}
