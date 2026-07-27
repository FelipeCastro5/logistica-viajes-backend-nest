import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para CreateRolDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateRolDto {
  /**
     * Propiedad del DTO que representa nombre_rol.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Administrador',
    description: 'Nombre del rol',
  })
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre del rol no debe exceder los 50 caracteres' })
  nombre_rol: string;
}
