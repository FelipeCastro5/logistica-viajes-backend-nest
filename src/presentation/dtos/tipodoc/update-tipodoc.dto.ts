import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateTipodocDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateTipodocDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 1,
    description: 'ID del tipo de documento a actualizar',
  })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  @IsNumber({}, { message: 'El ID debe ser un número' })
  id: number;

  /**
     * Propiedad del DTO que representa nombre_documento.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Cédula de extranjería',
    description: 'Nuevo nombre del tipo de documento',
  })
  @IsNotEmpty({ message: 'El nombre del documento es obligatorio' })
  @IsString({ message: 'El nombre del documento debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre del documento no debe exceder los 100 caracteres' })
  nombre_documento: string;

  /**
     * Propiedad del DTO que representa abreviatura.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'CE',
    description: 'Nueva abreviatura del tipo de documento',
  })
  @IsNotEmpty({ message: 'La abreviatura es obligatoria' })
  @IsString({ message: 'La abreviatura debe ser una cadena de texto' })
  @MaxLength(10, { message: 'La abreviatura no debe exceder los 10 caracteres' })
  abreviatura: string;
}
