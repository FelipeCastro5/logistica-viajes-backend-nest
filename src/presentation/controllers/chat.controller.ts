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

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los chats' })
  @ApiResponse({ status: 200, description: 'Chats obtenidos exitosamente' })
  async getAllChats() {
    return this.queryBus.execute(new GetAllChatsCommand());
  }

  @Get('getByUsuario')
  @ApiOperation({ summary: 'Obtener chat por ID' })
  @ApiResponse({ status: 200, description: 'Chats encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chats no encontrado' })
  async getChatById(@Query('id') id: number) {
    return this.queryBus.execute(new GetChatByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo chat' })
  @ApiResponse({ status: 201, description: 'Chat creado exitosamente' })
  async createChat(@Body() dto: CreateChatDto) {
    const command = new CreateChatCommand(
      dto.fk_usuario,
      dto.nombre_chat,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un chat existente' })
  @ApiResponse({ status: 200, description: 'Chat actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado' })
  async updateChat(@Body() dto: UpdateChatDto) {
    const command = new UpdateChatCommand(
      dto.id_chat,
      dto.fk_usuario,
      dto.nombre_chat,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un chat por ID' })
  @ApiResponse({ status: 200, description: 'Chat eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Chat no encontrado' })
  async deleteChat(@Query('id_chat') id_chat: number) {
    return this.commandBus.execute(new DeleteChatCommand(id_chat));
  }
}
