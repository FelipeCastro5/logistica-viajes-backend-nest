import { Body, Controller, Delete, Get, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { loginCommand } from './commands/login.command';
import { UpdatePasswordCommand } from './commands/update-password.command';
import { UpdatePasswordDto } from './dto/update-password.dto';

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
