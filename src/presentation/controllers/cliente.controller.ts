import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateClienteCommand } from '../../application/cliente/commands/create-cliente.command';
import { UpdateClienteCommand } from '../../application/cliente/commands/update-cliente.command';
import { DeleteClienteCommand } from '../../application/cliente/commands/delete-cliente.command';
import { GetAllClientesCommand } from '../../application/cliente/commands/get-all-clientes.command';
import { GetClienteByIdCommand } from '../../application/cliente/commands/get-cliente-by-id.command';

import { CreateClienteDto } from '../dtos/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/cliente/update-cliente.dto';
import { GetClientesByUsuarioCommand } from '../../application/cliente/commands/get-clientes-by-usuario.command';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Clientes obtenidos exitosamente' })
  async getAllClientes() {
    return this.queryBus.execute(new GetAllClientesCommand());
  }

  @Get('getById')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async getClienteById(@Query('id') id: number) {
    return this.queryBus.execute(new GetClienteByIdCommand(id));
  }

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async createCliente(@Body() dto: CreateClienteDto) {
    const command = new CreateClienteCommand(
      dto.fk_usuario,
      dto.nit,
      dto.nombre_cliente,
      dto.telefono,
    );
    return this.commandBus.execute(command);
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  async updateCliente(@Body() dto: UpdateClienteDto) {
    const command = new UpdateClienteCommand(
      dto.id,
      dto.fk_usuario,
      dto.nit,
      dto.nombre_cliente,
      dto.telefono,
    );
    return this.commandBus.execute(command);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  async deleteCliente(@Query('id') id: number) {
    return this.commandBus.execute(new DeleteClienteCommand(id));
  }

  @Get('getClientesByUsuario')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Clientes no encontrados' })
  async getClientesByUsuario(@Query('fk_usuario') fk_usuario: number) {
    return this.queryBus.execute(new GetClientesByUsuarioCommand(fk_usuario));
  }
}
