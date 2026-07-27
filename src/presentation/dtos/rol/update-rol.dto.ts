import { IsInt, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para UpdateRolDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateRolDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 1,
    description: 'ID del rol a actualizar',
  })
  @IsInt({ message: 'El ID debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
  id: number;

  /**
     * Propiedad del DTO que representa nombre_rol.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Supervisor',
    description: 'Nuevo nombre del rol',
  })
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre del rol no debe exceder los 50 caracteres' })
  nombre_rol: string;
}
