import { Body, Controller, Delete, Get, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { loginCommand } from './commands/login.command';
import { UpdatePasswordCommand } from './commands/update-password.command';
import { UpdatePasswordDto } from './dto/update-password.dto';

/**
 * Clase de infraestructura: AuthController.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@ApiTags('Author')
@Controller('Auth')
export class AuthController {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  /**
     * Ejecuta la operación técnica de getUsuarioByCorreo.
     * @param correo Parámetro de entrada de tipo string.
     * @param contrasena Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Get('login')
  @ApiOperation({ summary: 'Obtener usuario por correo para login' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUsuarioByCorreo(
    @Query('correo') correo: string,
    @Query('contrasena') contrasena: string
  ) {
    return this.queryBus.execute(new loginCommand(correo, contrasena));
  }

  /**
     * Ejecuta la operación técnica de updateUsuario.
     * @param dto Parámetro de entrada de tipo UpdatePasswordDto.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Put('update-password')
  @ApiOperation({ summary: 'Cambiar contraseña' })
  @ApiResponse({ status: 200, description: 'contraseña cambiada exitosamente' })
  async updateUsuario(@Body() dto: UpdatePasswordDto) {
    const command = new UpdatePasswordCommand(
      dto.id,
      dto.contrasena,
    );
    return this.commandBus.execute(command);
  }
}
