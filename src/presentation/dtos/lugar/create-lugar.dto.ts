import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLugarDto {
  @ApiProperty({
    example: 'Auditorio Central',
    description: 'Nombre del lugar a registrar',
  })
  @IsString({ message: 'El nombre del lugar debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del lugar es obligatorio' })
  @MaxLength(100, { message: 'El nombre del lugar no puede exceder los 100 caracteres' })
  nombre_lugar: string;
}
