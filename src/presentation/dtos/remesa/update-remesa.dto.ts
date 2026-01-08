import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateRemesaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id_remesa: number;

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
  @IsOptional()
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

  //Mercancia Peligrosa

  @ApiProperty({ example: 1, description: 'ID de la mercancía peligrosa', })
  @IsNumber({}, { message: 'id mercancía debe ser un número' })
  @IsOptional()
  id_mercancia: number;

  @ApiProperty({ example: 'UN 1203', description: 'Código UN' })
  @IsString({ message: 'codigo_un debe ser texto' })
  @IsOptional()
  codigo_un: string;

  @ApiProperty({ example: 'Clase 3', description: 'Grupo de riesgo' })
  @IsString({ message: 'grupo_riesgo debe ser texto' })
  @IsOptional()
  grupo_riesgo: string;

  @ApiProperty({ example: 'Líquido inflamable', description: 'Característica de peligrosidad', })
  @IsString({ message: 'caracteristica_peligrosidad debe ser texto' })
  @IsOptional()
  caracteristica_peligrosidad: string;

  @ApiProperty({ example: 'Bidón metálico', description: 'Tipo de embalaje o envase', })
  @IsString({ message: 'embalaje_envase debe ser texto' })
  @IsOptional()
  embalaje_envase: string;
}
