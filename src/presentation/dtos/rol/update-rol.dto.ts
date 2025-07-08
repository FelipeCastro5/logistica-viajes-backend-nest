import { IsInt, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolDto {
  @ApiProperty({
    example: 1,
    description: 'ID del rol a actualizar',
  })
  @IsInt({ message: 'El ID debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
  id: number;

  @ApiProperty({
    example: 'Supervisor',
    description: 'Nuevo nombre del rol',
  })
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre del rol no debe exceder los 50 caracteres' })
  nombre_rol: string;
}
