import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) para UpdateGastoXViajeDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateGastoXViajeDto {
  /**
     * Propiedad del DTO que representa id_gastoxviaje.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 10, description: 'ID del gasto por viaje a actualizar' })
  @IsNumber({}, { message: 'El campo id debe ser un número' })
  @IsNotEmpty({ message: 'El campo id es obligatorio' })
  id_gastoxviaje: number;

  /**
     * Propiedad del DTO que representa fk_viaje.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del viaje relacionado' })
  @IsNumber({}, { message: 'El campo fk_viaje debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_viaje es obligatorio' })
  fk_viaje: number;

  /**
     * Propiedad del DTO que representa fk_gasto.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 3, description: 'ID del tipo de gasto' })
  @IsNumber({}, { message: 'El campo fk_gasto debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_gasto es obligatorio' })
  fk_gasto: number;

  /**
     * Propiedad del DTO que representa valor.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 50000, description: 'Valor del gasto actualizado' })
  @IsNumber({}, { message: 'El campo valor debe ser un número' })
  @Min(1, { message: 'El valor debe ser mayor a 0' })
  @IsNotEmpty({ message: 'El campo fk_gasto es obligatorio' })
  valor: number;

  /**
     * Propiedad del DTO que representa detalles.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Peaje y parqueadero', description: 'Detalles del gasto actualizado' })
  @IsString({ message: 'El campo detalles debe ser una cadena de texto' })
  @IsOptional({ message: 'El campo detalles es obligatorio' })
  detalles: string;
}
