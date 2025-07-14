import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: 5, description: 'ID del usuario que se va a actualizar' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero.' })
  id: number;

  @ApiProperty({ example: 'Segura123!', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
  contrasena: string;
}
