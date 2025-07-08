import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateGastoDto {
  @ApiProperty({
    example: 1,
    description: 'ID del gasto',
  })
  @IsNotEmpty({ message: 'El ID del gasto es obligatorio' })
  @IsNumber({}, { message: 'El ID del gasto debe ser un número' })
  id: number;

  @ApiProperty({
    example: 'Alimentación',
    description: 'Nombre actualizado del gasto',
  })
  @IsNotEmpty({ message: 'El nombre del gasto es obligatorio' })
  @IsString({ message: 'El nombre del gasto debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre del gasto debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre del gasto no debe superar los 50 caracteres' })
  nombre_gasto: string;
}
