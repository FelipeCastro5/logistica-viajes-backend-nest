import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateTipodocDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateTipodocDto {
  /**
     * Propiedad del DTO que representa nombre_documento.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Cédula de ciudadanía',
    description: 'Nombre completo del tipo de documento',
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
    example: 'CC',
    description: 'Abreviatura del tipo de documento',
  })
  @IsNotEmpty({ message: 'La abreviatura es obligatoria' })
  @IsString({ message: 'La abreviatura debe ser una cadena de texto' })
  @MaxLength(10, { message: 'La abreviatura no debe exceder los 10 caracteres' })
  abreviatura: string;
}
