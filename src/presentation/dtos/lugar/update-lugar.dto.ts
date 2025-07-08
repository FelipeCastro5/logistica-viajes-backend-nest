import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateLugarDto {
  @ApiProperty({
    example: 1,
    description: 'ID del lugar a actualizar',
  })
  @IsNumber({}, { message: 'El ID debe ser un número' })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: number;

  @ApiProperty({
    example: 'Sala de Conferencias 2',
    description: 'Nuevo nombre del lugar',
  })
  @IsString({ message: 'El nombre del lugar debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del lugar es obligatorio' })
  @MaxLength(100, { message: 'El nombre del lugar no puede exceder los 100 caracteres' })
  nombre_lugar: string;
}
