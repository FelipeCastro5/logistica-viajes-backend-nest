import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateLugarDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateLugarDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 1,
    description: 'ID del lugar a actualizar',
  })
  @IsNumber({}, { message: 'El ID debe ser un número' })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: number;

  /**
     * Propiedad del DTO que representa nombre_lugar.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Sala de Conferencias 2',
    description: 'Nuevo nombre del lugar',
  })
  @IsString({ message: 'El nombre del lugar debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del lugar es obligatorio' })
  @MaxLength(100, { message: 'El nombre del lugar no puede exceder los 100 caracteres' })
  nombre_lugar: string;
}
