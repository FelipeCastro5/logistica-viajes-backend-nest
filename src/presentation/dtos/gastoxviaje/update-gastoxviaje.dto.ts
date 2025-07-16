import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGastoXViajeDto {
  @ApiProperty({ example: 10, description: 'ID del gasto por viaje a actualizar' })
  @IsNumber({}, { message: 'El campo id debe ser un número' })
  @IsNotEmpty({ message: 'El campo id es obligatorio' })
  id_gastoxviaje: number;

  @ApiProperty({ example: 1, description: 'ID del viaje relacionado' })
  @IsNumber({}, { message: 'El campo fk_viaje debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_viaje es obligatorio' })
  fk_viaje: number;

  @ApiProperty({ example: 3, description: 'ID del tipo de gasto' })
  @IsNumber({}, { message: 'El campo fk_gasto debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_gasto es obligatorio' })
  fk_gasto: number;

  @ApiProperty({ example: 50000, description: 'Valor del gasto actualizado' })
  @IsNumber({}, { message: 'El campo valor debe ser un número' })
  @Min(1, { message: 'El valor debe ser mayor a 0' })
  @IsNotEmpty({ message: 'El campo fk_gasto es obligatorio' })
  valor: number;

  @ApiProperty({ example: 'Peaje y parqueadero', description: 'Detalles del gasto actualizado' })
  @IsString({ message: 'El campo detalles debe ser una cadena de texto' })
  @IsOptional({ message: 'El campo detalles es obligatorio' })
  detalles: string;
}
