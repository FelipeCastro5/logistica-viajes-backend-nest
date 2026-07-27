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

/**
 * Controlador REST para Cliente.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllClientes.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Clientes obtenidos exitosamente' })
  async getAllClientes() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllClientesCommand());
    }

  /**
     * Endpoint para la operación de getClienteById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async getClienteById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetClienteByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createCliente.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async createCliente(@Body() dto: CreateClienteDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateClienteCommand(
          dto.fk_usuario,
          dto.nit,
          dto.nombre_cliente,
          dto.telefono,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateCliente.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  async updateCliente(@Body() dto: UpdateClienteDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateClienteCommand(
          dto.id,
          dto.fk_usuario,
          dto.nit,
          dto.nombre_cliente,
          dto.telefono,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteCliente.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  async deleteCliente(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteClienteCommand(id));
    }

  /**
     * Endpoint para la operación de getClientesByUsuario.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_usuario Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getClientesByUsuario')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Clientes no encontrados' })
  async getClientesByUsuario(@Query('fk_usuario') fk_usuario: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetClientesByUsuarioCommand(fk_usuario));
    }
}
