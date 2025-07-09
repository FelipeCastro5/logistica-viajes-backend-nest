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

@ApiTags('Mensajes')
@Controller('mensajes')
export class MensajeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los mensajes' })
  @ApiResponse({ status: 200, description: 'Mensajes obtenidos exitosamente' })
  async getAllMensajes() {
    return this.queryBus.execute(new GetAllMensajesCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener mensaje por ID' })
  @ApiResponse({ status: 200, description: 'Mensaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async getMensajeById(@Query('id') id: number) {
    return this.queryBus.execute(new GetMensajeByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo mensaje' })
  @ApiResponse({ status: 201, description: 'Mensaje creado exitosamente' })
  async createMensaje(@Body() dto: CreateMensajeDto) {
    const command = new CreateMensajeCommand(
      dto.fk_chat,
      dto.pregunta,
      dto.respuesta,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un mensaje existente' })
  @ApiResponse({ status: 200, description: 'Mensaje actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async updateMensaje(@Body() dto: UpdateMensajeDto) {
    const command = new UpdateMensajeCommand(
      dto.id,
      dto.fk_chat,
      dto.pregunta,
      dto.respuesta,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un mensaje por ID' })
  @ApiResponse({ status: 200, description: 'Mensaje eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mensaje no encontrado' })
  async deleteMensaje(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteMensajeCommand(id));
  }
}
