import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateSeguroDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateSeguroDto {
  /**
     * Propiedad del DTO que representa fk_vehiculo.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del vehículo asociado' })
  @IsNumber({}, { message: 'El campo fk_vehiculo debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_vehiculo es obligatorio' })
  fk_vehiculo: number;

  /**
     * Propiedad del DTO que representa tipo_seguro.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'SOAT', description: 'Tipo de seguro' })
  @IsString({ message: 'El campo tipo_seguro debe ser texto' })
  @IsNotEmpty({ message: 'El campo tipo_seguro es obligatorio' })
  tipo_seguro: string;

  /**
     * Propiedad del DTO que representa numero_poliza.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'POL-123456', description: 'Número de póliza' })
  @IsString({ message: 'El campo numero_poliza debe ser texto' })
  @IsNotEmpty({ message: 'El campo numero_poliza es obligatorio' })
  numero_poliza: string;

  /**
     * Propiedad del DTO que representa aseguradora.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'SURA', description: 'Aseguradora' })
  @IsString({ message: 'El campo aseguradora debe ser texto' })
  @IsNotEmpty({ message: 'El campo aseguradora es obligatorio' })
  aseguradora: string;

  /**
     * Propiedad del DTO que representa fecha_vencimiento.
     * Tipo esperado: Date.
     */
    @ApiProperty({ example: '2026-12-31', description: 'Fecha de vencimiento' })
  @IsDateString({}, { message: 'La fecha_vencimiento debe ser válida' })
  @IsNotEmpty({ message: 'El campo fecha_vencimiento es obligatorio' })
  fecha_vencimiento: Date;

  /**
     * Propiedad del DTO que representa valor.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1200000, description: 'Valor del seguro' })
  @IsNumber({}, { message: 'El campo valor debe ser numérico' })
  @IsNotEmpty({ message: 'El campo valor es obligatorio' })
  valor: number;
}
