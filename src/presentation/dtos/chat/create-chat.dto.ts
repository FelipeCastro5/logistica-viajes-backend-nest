import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: 1, description: 'ID del usuario al que pertenece el chat' })
  @IsInt({ message: 'El campo fk_usuario debe ser un número entero' })
  @Min(1, { message: 'El campo fk_usuario debe ser mayor que 0' })
  fk_usuario: number;

  @ApiProperty({ example: 'Chat general', description: 'Nombre del chat' })
  @IsString({ message: 'El campo nombre_chat debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre_chat no debe estar vacío' })
  nombre_chat: string;
}
