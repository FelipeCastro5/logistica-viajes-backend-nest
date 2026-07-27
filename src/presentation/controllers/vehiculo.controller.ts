import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateVehiculoCommand } from '../../application/vehiculo/commands/create-vehiculo.command';
import { UpdateVehiculoCommand } from '../../application/vehiculo/commands/update-vehiculo.command';
import { DeleteVehiculoCommand } from '../../application/vehiculo/commands/delete-vehiculo.command';
import { GetAllVehiculosCommand } from '../../application/vehiculo/commands/get-all-vehiculos.command';
import { GetVehiculoByIdCommand } from '../../application/vehiculo/commands/get-vehiculo-by-id.command';
import { GetVehiculosByUsuarioCommand } from '../../application/vehiculo/commands/get-vehiculos-by-usuario.command';
import { CreateVehiculoDto } from '../dtos/vehiculo/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dtos/vehiculo/update-vehiculo.dto';


/**
 * Controlador REST para Vehiculo.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Vehiculos')
@Controller('vehiculos')
export class VehiculoController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
     * Endpoint para la operación de getAllVehiculos.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los vehículos' })
  @ApiResponse({ status: 200, description: 'Vehículos obtenidos exitosamente' })
  async getAllVehiculos() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllVehiculosCommand());
    }

  /**
     * Endpoint para la operación de getVehiculoById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener vehículo por ID' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async getVehiculoById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetVehiculoByIdCommand(id));
    }

  /**
     * Endpoint para la operación de createVehiculo.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo vehículo' })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente' })
  async createVehiculo(@Body() dto: CreateVehiculoDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateVehiculoCommand(
          dto.fk_usuario,
          dto.placa,
          dto.marca,
          dto.configuracion,
          dto.tipo_vehiculo,
          dto.peso_vacio,
          dto.peso_remolque,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateVehiculo.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update')
  @ApiOperation({ summary: 'Actualizar un vehículo existente' })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado exitosamente' })
  async updateVehiculo(@Body() dto: UpdateVehiculoDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateVehiculoCommand(
          dto.id,
          dto.fk_usuario,
          dto.placa,
          dto.marca,
          dto.configuracion,
          dto.tipo_vehiculo,
          dto.peso_vacio,
          dto.peso_remolque,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de deleteVehiculo.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un vehículo por ID' })
  @ApiResponse({ status: 200, description: 'Vehículo eliminado exitosamente' })
  async deleteVehiculo(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteVehiculoCommand(id));
    }

  /**
     * Endpoint para la operación de getVehiculosByUsuario.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_usuario Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getByUsuario')
  @ApiOperation({ summary: 'Obtener vehículos por usuario' })
  @ApiResponse({ status: 200, description: 'Vehículos encontrados exitosamente' })
  @ApiResponse({ status: 404, description: 'Vehículos no encontrados' })
  async getVehiculosByUsuario(@Query('fk_usuario') fk_usuario: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(
          new GetVehiculosByUsuarioCommand(fk_usuario),
        );
    }
}
