import { Body, Controller, Delete, Get, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { loginCommand } from './commands/login.command';
import { CambioContrasenaCommand } from './commands/cambio-contrasena.command';
import { CambioContrasenaDto } from './dto/cambiar-contrasena.dto';

@ApiTags('Author')
@Controller('Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

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

  @Put('cambiar-contrasena')
  @ApiOperation({ summary: 'Cambiar contraseña' })
  @ApiResponse({ status: 200, description: 'contraseña cambiada exitosamente' })
  async updateUsuario(@Body() dto: CambioContrasenaDto) {
    const command = new CambioContrasenaCommand(
      dto.id,
      dto.contrasena,
    );
    return this.commandBus.execute(command);
  }
}
