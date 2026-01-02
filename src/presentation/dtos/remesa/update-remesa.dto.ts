import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateRemesaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  fk_viaje: number;

  @ApiProperty({ example: 'REM-001' })
  @IsString()
  @IsNotEmpty()
  numero_remesa: string;

  @ApiProperty({ example: 'AUT-12345' })
  @IsString()
  @IsNotEmpty()
  numero_autorizacion: string;

  @ApiProperty({ example: 'Caja' })
  @IsString()
  @IsNotEmpty()
  tipo_empaque: string;

  @ApiProperty({ example: 'Carga general' })
  @IsString()
  @IsNotEmpty()
  naturaleza_carga: string;

  @ApiProperty({ example: '010121' })
  @IsString()
  @IsNotEmpty()
  codigo_armonizado: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @ApiProperty({ example: 'Kg' })
  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @IsNotEmpty()
  peso_total: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  mercancia_peligrosa: boolean;

  @ApiProperty({ example: 'Observaciones actualizadas', required: false })
  @IsString()
  @IsOptional()
  observaciones: string;
}
