import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateGastoDto {
  @ApiProperty({
    example: 'Transporte',
    description: 'Nombre del gasto',
  })
  @IsNotEmpty({ message: 'El nombre del gasto es obligatorio' })
  @IsString({ message: 'El nombre del gasto debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre del gasto debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre del gasto no debe superar los 50 caracteres' })
  nombre_gasto: string;
}
