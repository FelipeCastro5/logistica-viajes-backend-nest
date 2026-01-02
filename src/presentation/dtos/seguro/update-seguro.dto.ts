import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateSeguroDto {
  @ApiProperty({ example: 1, description: 'ID del seguro' })
  @IsNumber({}, { message: 'El campo id debe ser un número' })
  @IsNotEmpty({ message: 'El campo id es obligatorio' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID del vehículo asociado' })
  @IsNumber({}, { message: 'El campo fk_vehiculo debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_vehiculo es obligatorio' })
  fk_vehiculo: number;

  @ApiProperty({ example: 'Póliza de carga', description: 'Tipo de seguro' })
  @IsString({ message: 'El campo tipo_seguro debe ser texto' })
  @IsNotEmpty({ message: 'El campo tipo_seguro es obligatorio' })
  tipo_seguro: string;

  @ApiProperty({ example: 'POL-987654', description: 'Número de póliza' })
  @IsString({ message: 'El campo numero_poliza debe ser texto' })
  @IsNotEmpty({ message: 'El campo numero_poliza es obligatorio' })
  numero_poliza: string;

  @ApiProperty({ example: 'MAPFRE', description: 'Aseguradora' })
  @IsString({ message: 'El campo aseguradora debe ser texto' })
  @IsNotEmpty({ message: 'El campo aseguradora es obligatorio' })
  aseguradora: string;

  @ApiProperty({ example: '2027-01-01', description: 'Fecha de vencimiento' })
  @IsDateString({}, { message: 'La fecha_vencimiento debe ser válida' })
  @IsNotEmpty({ message: 'El campo fecha_vencimiento es obligatorio' })
  fecha_vencimiento: Date;

  @ApiProperty({ example: 1500000, description: 'Valor del seguro' })
  @IsNumber({}, { message: 'El campo valor debe ser numérico' })
  @IsNotEmpty({ message: 'El campo valor es obligatorio' })
  valor: number;
}
