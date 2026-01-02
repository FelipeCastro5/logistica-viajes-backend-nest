import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateVehiculoDto {
  @ApiProperty({ example: 1, description: 'ID del vehículo' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 1, description: 'ID del usuario propietario' })
  @IsNumber()
  @IsOptional()
  fk_usuario: number | null;

  @ApiProperty({ example: 'ABC123', description: 'Placa del vehículo' })
  @IsString()
  @IsNotEmpty()
  placa: string;

  @ApiProperty({ example: 'Volvo', description: 'Marca del vehículo' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({ example: '6x4', description: 'Configuración del vehículo' })
  @IsString()
  @IsNotEmpty()
  configuracion: string;

  @ApiProperty({ example: 'Camión', description: 'Tipo de vehículo' })
  @IsString()
  @IsNotEmpty()
  tipo_vehiculo: string;

  @ApiProperty({ example: 8500, description: 'Peso vacío en kg' })
  @IsNumber()
  @IsNotEmpty()
  peso_vacio: number;

  @ApiProperty({ example: 12000, description: 'Peso del remolque en kg' })
  @IsNumber()
  @IsNotEmpty()
  peso_remolque: number;
}
