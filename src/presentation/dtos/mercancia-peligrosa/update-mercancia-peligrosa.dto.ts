import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateMercanciaPeligrosaDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateMercanciaPeligrosaDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 1,
    description: 'ID de la mercancía peligrosa',
  })
  @IsNumber({}, { message: 'id debe ser un número' })
  @IsNotEmpty({ message: 'id es obligatorio' })
  id: number;

  /**
     * Propiedad del DTO que representa fk_remesa.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 10, description: 'ID de la remesa asociada' })
  @IsNumber({}, { message: 'fk_remesa debe ser un número' })
  @IsNotEmpty({ message: 'fk_remesa es obligatorio' })
  fk_remesa: number;

  /**
     * Propiedad del DTO que representa codigo_un.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'UN 1203', description: 'Código UN' })
  @IsString({ message: 'codigo_un debe ser texto' })
  @IsNotEmpty({ message: 'codigo_un es obligatorio' })
  codigo_un: string;

  /**
     * Propiedad del DTO que representa grupo_riesgo.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Clase 3', description: 'Grupo de riesgo' })
  @IsString({ message: 'grupo_riesgo debe ser texto' })
  @IsNotEmpty({ message: 'grupo_riesgo es obligatorio' })
  grupo_riesgo: string;

  /**
     * Propiedad del DTO que representa caracteristica_peligrosidad.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Líquido inflamable',
    description: 'Característica de peligrosidad',
  })
  @IsString({ message: 'caracteristica_peligrosidad debe ser texto' })
  @IsNotEmpty({
    message: 'caracteristica_peligrosidad es obligatoria',
  })
  caracteristica_peligrosidad: string;

  /**
     * Propiedad del DTO que representa embalaje_envase.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Bidón metálico',
    description: 'Tipo de embalaje o envase',
  })
  @IsString({ message: 'embalaje_envase debe ser texto' })
  @IsNotEmpty({ message: 'embalaje_envase es obligatorio' })
  embalaje_envase: string;
}
