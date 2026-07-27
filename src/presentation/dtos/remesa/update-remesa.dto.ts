import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateRemesaDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateRemesaDto {
  /**
     * Propiedad del DTO que representa id_remesa.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id_remesa: number;

  /**
     * Propiedad del DTO que representa fk_viaje.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  fk_viaje: number;

  /**
     * Propiedad del DTO que representa numero_remesa.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'REM-001' })
  @IsString()
  @IsNotEmpty()
  numero_remesa: string;

  /**
     * Propiedad del DTO que representa numero_autorizacion.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'AUT-12345' })
  @IsString()
  @IsNotEmpty()
  numero_autorizacion: string;

  /**
     * Propiedad del DTO que representa tipo_empaque.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Caja' })
  @IsString()
  @IsNotEmpty()
  tipo_empaque: string;

  /**
     * Propiedad del DTO que representa naturaleza_carga.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Carga general' })
  @IsString()
  @IsNotEmpty()
  naturaleza_carga: string;

  /**
     * Propiedad del DTO que representa codigo_armonizado.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '010121' })
  @IsString()
  @IsOptional()
  codigo_armonizado: string;

  /**
     * Propiedad del DTO que representa cantidad.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  /**
     * Propiedad del DTO que representa unidad_medida.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Kg' })
  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  /**
     * Propiedad del DTO que representa peso_total.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1200 })
  @IsNumber()
  @IsNotEmpty()
  peso_total: number;

  /**
     * Propiedad del DTO que representa mercancia_peligrosa.
     * Tipo esperado: boolean.
     */
    @ApiProperty({ example: false })
  @IsBoolean()
  mercancia_peligrosa: boolean;

  /**
     * Propiedad del DTO que representa observaciones.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Observaciones actualizadas', required: false })
  @IsString()
  @IsOptional()
  observaciones: string;

  //Mercancia Peligrosa

  /**
     * Propiedad del DTO que representa id_mercancia.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID de la mercancía peligrosa', })
  @IsNumber({}, { message: 'id mercancía debe ser un número' })
  @IsOptional()
  id_mercancia: number;

  /**
     * Propiedad del DTO que representa codigo_un.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'UN 1203', description: 'Código UN' })
  @IsString({ message: 'codigo_un debe ser texto' })
  @IsOptional()
  codigo_un: string;

  /**
     * Propiedad del DTO que representa grupo_riesgo.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Clase 3', description: 'Grupo de riesgo' })
  @IsString({ message: 'grupo_riesgo debe ser texto' })
  @IsOptional()
  grupo_riesgo: string;

  /**
     * Propiedad del DTO que representa caracteristica_peligrosidad.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Líquido inflamable', description: 'Característica de peligrosidad', })
  @IsString({ message: 'caracteristica_peligrosidad debe ser texto' })
  @IsOptional()
  caracteristica_peligrosidad: string;

  /**
     * Propiedad del DTO que representa embalaje_envase.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Bidón metálico', description: 'Tipo de embalaje o envase', })
  @IsString({ message: 'embalaje_envase debe ser texto' })
  @IsOptional()
  embalaje_envase: string;
}
