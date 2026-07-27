import { BadRequestException, Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { CreateGastoXViajeCommand } from '../../application/gastoxviaje/commands/create-gastoxviaje.command';
import { UpdateGastoXViajeCommand } from '../../application/gastoxviaje/commands/update-gastoxviaje.command';
import { DeleteGastoXViajeCommand } from '../../application/gastoxviaje/commands/delete-gastoxviaje.command';
import { GetAllGastosXViajeCommand } from '../../application/gastoxviaje/commands/get-all-gastosxviaje.command';
import { GetGastoXViajeByIdCommand } from '../../application/gastoxviaje/commands/get-gastoxviaje-by-id.command';
import { UpdateGastoXViajeFacturaCommand } from '../../application/gastoxviaje/commands/update-gastoxviaje-factura.command';
import { DeleteGastoXViajeFacturaCommand } from '../../application/gastoxviaje/commands/delete-gastoxviaje-factura.command';
import { DownloadGastoXViajeFacturaCommand } from '../../application/gastoxviaje/commands/download-gastoxviaje-factura.command';

import { CreateGastoXViajeDto } from '../dtos/gastoxviaje/create-gastoxviaje.dto';
import { UpdateGastoXViajeDto } from '../dtos/gastoxviaje/update-gastoxviaje.dto';
import { GetGastosByViajeCommand } from 'src/application/gastoxviaje/commands/get-gastos-by-viaje.command';

const allowedFacturaMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
]);

/**
 * Controlador REST para Gastoxviaje.
 * Se encarga de recibir peticiones HTTP, validarlas y enrutarlas hacia la capa de aplicación (CQRS).
 */
@ApiTags('Gastos por Viaje')
@Controller('gastoxviaje')
export class GastoxviajeController {
  /** Constructor de la clase. Inyecta dependencias como el bus de comandos/consultas. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  /**
     * Endpoint para la operación de getAll.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los gastos por viaje' })
  @ApiResponse({ status: 200, description: 'Gastos por viaje obtenidos exitosamente' })
  async getAll() {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetAllGastosXViajeCommand());
    }

  /**
     * Endpoint para la operación de getById.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getById')
  @ApiOperation({ summary: 'Obtener gasto por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasto por viaje no encontrado' })
  async getById(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetGastoXViajeByIdCommand(id));
    }

  /**
     * Endpoint para la operación de create.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param dto Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo gasto por viaje' })
  @ApiResponse({ status: 201, description: 'Gasto por viaje creado exitosamente' })
  async create(@Body() dto: CreateGastoXViajeDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new CreateGastoXViajeCommand(
          dto.fk_viaje, dto.fk_gasto, dto.valor, dto.detalles,
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
  @ApiOperation({ summary: 'Actualizar un gasto por viaje existente' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje actualizado exitosamente' })
  async update(@Body() dto: UpdateGastoXViajeDto) {
        // 1. Construimos el comando CQRS mapeando los datos de la petición (DTO/Query/Param).
        const command = new UpdateGastoXViajeCommand(
          dto.id_gastoxviaje, dto.fk_viaje, dto.fk_gasto, dto.valor, dto.detalles,
        );
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.

        return this.commandBus.execute(command);
    }

  /**
     * Endpoint para la operación de updateFactura.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id_gastoxviaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @param file Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Put('update-factura')
  @ApiOperation({ summary: 'Subir factura de un gasto por viaje y guardar su URL e ID en Drive' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_gastoxviaje: { type: 'integer' },
        file: { type: 'string', format: 'binary' },
      },
      required: ['id_gastoxviaje', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
      if (!allowedFacturaMimeTypes.has(file.mimetype)) {
        return callback(new BadRequestException('Solo se permiten imágenes o PDF para la factura.'), false);
      }

      return callback(null, true);
    },
  }))
  async updateFactura(
    @Body('id_gastoxviaje', ParseIntPipe) id_gastoxviaje: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
        if (!file) {
          throw new BadRequestException('Debes adjuntar un archivo para la factura.');
        }

        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.


        return this.commandBus.execute(
          new UpdateGastoXViajeFacturaCommand(id_gastoxviaje, file),
        );
    }

  /**
     * Endpoint para la operación de downloadFactura.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param response Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @param reference Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('download-factura')
  @ApiOperation({ summary: 'Descargar la factura asociada a un gasto por viaje o por referencia de Drive' })
  @ApiQuery({ name: 'reference', required: true, description: 'ID del gasto por viaje, URL o ID del archivo en Google Drive' })
  async downloadFactura(
    @Res() response: Response,
    @Query('reference') reference?: string,
  ): Promise<void> {
        const { stream, fileName, mimeType } = await this.queryBus.execute(
          new DownloadGastoXViajeFacturaCommand(reference || ''),
        );

        response.setHeader('Content-Type', mimeType || 'application/octet-stream');
        response.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);

        stream.pipe(response);
    }

  /**
     * Endpoint para la operación de deleteFactura.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id_gastoxviaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete-factura')
  @ApiOperation({ summary: 'Eliminar la factura asociada a un gasto por viaje y limpiar URL e ID en la base de datos' })
  @ApiQuery({ name: 'id_gastoxviaje', required: true, description: 'ID del gasto por viaje' })
  async deleteFactura(@Query('id_gastoxviaje', ParseIntPipe) id_gastoxviaje: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteGastoXViajeFacturaCommand(id_gastoxviaje));
    }

  /**
     * Endpoint para la operación de delete.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param id Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Delete('delete')
  @ApiOperation({ summary: 'Eliminar un gasto por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gasto por viaje eliminado exitosamente' })
  async delete(@Query('id') id: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.commandBus.execute(new DeleteGastoXViajeCommand(id));
    }

  /**
     * Endpoint para la operación de getGastosByViaje.
     * Recibe la petición y despacha el comando/consulta correspondiente.
     * @param fk_viaje Parámetro recibido en la petición HTTP (Body, Query o Param).
     * @returns El resultado de la ejecución en la capa de aplicación devuelto como respuesta HTTP.
     */
    @Get('getGastosByViaje')
  @ApiOperation({ summary: 'Obtener gastos por viaje por ID' })
  @ApiResponse({ status: 200, description: 'Gastos por viaje encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Gastos por viaje no encontrado' })
  async getGastosByViaje(@Query('fk_viaje') fk_viaje: number) {
        // 2. Despachamos la acción al bus correspondiente de NestJS CQRS y retornamos el resultado.
        return this.queryBus.execute(new GetGastosByViajeCommand(fk_viaje));
    }
}
