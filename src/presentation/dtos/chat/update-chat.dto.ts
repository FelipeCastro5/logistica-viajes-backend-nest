import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateChatDto {
  @ApiProperty({ example: 1, description: 'ID del chat a actualizar' })
  @IsInt({ message: 'El campo id debe ser un número entero' })
  @Min(1, { message: 'El campo id debe ser mayor que 0' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID del usuario dueño del chat' })
  @IsInt({ message: 'El campo fk_usuario debe ser un número entero' })
  @Min(1, { message: 'El campo fk_usuario debe ser mayor que 0' })
  fk_usuario: number;

  @ApiProperty({ example: 'Chat renombrado', description: 'Nuevo nombre del chat' })
  @IsString({ message: 'El campo nombre_chat debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre_chat no debe estar vacío' })
  nombre_chat: string;
}
