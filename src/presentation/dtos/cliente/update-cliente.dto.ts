import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateClienteDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateClienteDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del cliente a actualizar' })
  @IsNumber({}, { message: 'El campo id debe ser un número' })
  @IsNotEmpty({ message: 'El campo id es obligatorio' })
  id: number;

  /**
     * Propiedad del DTO que representa fk_usuario.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  @IsNumber({}, { message: 'El campo fk_usuario debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_usuario es obligatorio' })
  fk_usuario: number;

  /**
     * Propiedad del DTO que representa nit.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '901234567', description: 'NIT del cliente' })
  @IsString({ message: 'El campo nit debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nit es obligatorio' })
  nit: string;

  /**
     * Propiedad del DTO que representa nombre_cliente.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Empresa XYZ', description: 'Nombre del cliente' })
  @IsString({ message: 'El campo nombre_cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre_cliente es obligatorio' })
  nombre_cliente: string;

  /**
     * Propiedad del DTO que representa telefono.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '3123456789', description: 'Teléfono del cliente' })
  @IsString({ message: 'El campo telefono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo telefono es obligatorio' })
  telefono: string;
}
