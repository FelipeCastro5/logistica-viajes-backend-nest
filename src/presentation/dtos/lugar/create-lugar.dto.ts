import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateLugarDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateLugarDto {
  /**
     * Propiedad del DTO que representa nombre_lugar.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Auditorio Central',
    description: 'Nombre del lugar a registrar',
  })
  @IsString({ message: 'El nombre del lugar debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del lugar es obligatorio' })
  @MaxLength(100, { message: 'El nombre del lugar no puede exceder los 100 caracteres' })
  nombre_lugar: string;
}
