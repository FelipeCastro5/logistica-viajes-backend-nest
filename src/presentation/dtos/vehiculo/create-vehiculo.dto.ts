import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Length, Matches } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateVehiculoDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateVehiculoDto {
  /**
     * Propiedad del DTO que representa fk_usuario.
     * Tipo esperado: number | null.
     */
    @ApiProperty({ example: 1, description: 'ID del usuario propietario' })
  @IsNumber({}, { message: 'El campo fk_usuario debe ser un número' })
  @IsOptional()
  fk_usuario: number | null;

  /**
     * Propiedad del DTO que representa placa.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'ABC123', description: 'Placa del vehículo (3 letras mayúsculas + 3 números, sin guiones)' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'La placa debe tener exactamente 6 caracteres' })
  @Matches(/^[A-Za-z]{3}[0-9]{3}$/, { message: 'La placa debe tener 3 letras seguidas de 3 números, sin guiones' })
  placa: string;

  /**
     * Propiedad del DTO que representa marca.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Volvo', description: 'Marca del vehículo' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  /**
     * Propiedad del DTO que representa configuracion.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '6x4', description: 'Configuración del vehículo' })
  @IsString()
  @IsNotEmpty()
  configuracion: string;

  /**
     * Propiedad del DTO que representa tipo_vehiculo.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Camión', description: 'Tipo de vehículo' })
  @IsString()
  @IsNotEmpty()
  tipo_vehiculo: string;

  /**
     * Propiedad del DTO que representa peso_vacio.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 8500, description: 'Peso vacío en kg' })
  @IsNumber()
  @IsNotEmpty()
  peso_vacio: number;

  /**
     * Propiedad del DTO que representa peso_remolque.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 12000, description: 'Peso del remolque en kg' })
  @IsNumber()
  @IsNotEmpty()
  peso_remolque: number;
}
