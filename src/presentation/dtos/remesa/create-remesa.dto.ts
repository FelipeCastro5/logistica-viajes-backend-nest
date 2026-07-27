import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateRemesaDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateRemesaDto {
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
  @IsNotEmpty()
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
    @ApiProperty({ example: 'Sin observaciones', required: false })
  @IsString()
  @IsOptional()
  observaciones: string;
}
