import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateViajeDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateViajeDto {
  /**
     * Propiedad del DTO que representa id_viaje.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del viaje' })
  @IsInt({ message: 'El id debe ser un número entero' })
  id_viaje: number;

  /**
     * Propiedad del DTO que representa fk_usuario.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del usuario' })
  @IsInt({ message: 'El fk_usuario debe ser un número entero' })
  fk_usuario: number;

  /**
     * Propiedad del DTO que representa fk_manifiesto.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del manifiesto' })
  @IsInt({ message: 'El fk_manifiesto debe ser un número entero' })
  fk_manifiesto: number;

  /**
     * Propiedad del DTO que representa fk_cliente.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del cliente' })
  @IsInt({ message: 'El fk_cliente debe ser un número entero' })
  fk_cliente: number;

  /**
     * Propiedad del DTO que representa fk_origen.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del origen' })
  @IsInt({ message: 'El fk_origen debe ser un número entero' })
  fk_origen: number;

  /**
     * Propiedad del DTO que representa fk_destino.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 2, description: 'ID del destino' })
  @IsInt({ message: 'El fk_destino debe ser un número entero' })
  fk_destino: number;

  /**
     * Propiedad del DTO que representa codigo.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'VJ-001', description: 'Código del viaje' })
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  codigo: string;

  /**
     * Propiedad del DTO que representa observaciones.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Observaciones actualizadas', required: false })
  @IsString({ message: 'Las observaciones deben ser una cadena de texto' })
  @IsOptional()
  observaciones?: string;

  /**
     * Propiedad del DTO que representa estado_viaje.
     * Tipo esperado: boolean.
     */
    @ApiProperty({ example: true, description: 'Estado del viaje' })
  @IsBoolean({ message: 'El estado_viaje debe ser un valor booleano' })
  estado_viaje: boolean;

  /**
     * Propiedad del DTO que representa producto.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Producto actualizado', description: 'Producto' })
  @IsString({ message: 'El producto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El producto es requerido' })
  producto: string;

  /**
     * Propiedad del DTO que representa detalle_producto.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Detalle actualizado', required: false })
  @IsString({ message: 'El detalle_producto debe ser una cadena de texto' })
  @IsOptional()
  detalle_producto?: string;

  /**
     * Propiedad del DTO que representa direccion_llegada.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Calle nueva 456 #78-90', description: 'Dirección de llegada' })
  @IsString({ message: 'La dirección de llegada debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección de llegada es requerida' })
  direccion_llegada: string;

  /**
     * Propiedad del DTO que representa fecha_salida.
     * Tipo esperado: Date.
     */
    @ApiProperty({ example: '2025-07-08T12:00:00Z', description: 'Fecha de salida' })
  @IsDateString({}, { message: 'La fecha_salida debe ser una fecha válida' })
  fecha_salida: Date;

  /**
     * Propiedad del DTO que representa fecha_llegada.
     * Tipo esperado: Date.
     */
    @ApiProperty({ example: '2025-07-09T20:00:00Z', description: 'Fecha de llegada' })
  @IsDateString({}, { message: 'La fecha_llegada debe ser una fecha válida' })
  fecha_llegada: Date;

  /**
     * Propiedad del DTO que representa latitud_origen.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() latitud_origen: number;
  /**
     * Propiedad del DTO que representa longitud_origen.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() longitud_origen: number;
  /**
     * Propiedad del DTO que representa latitud_destino.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() latitud_destino: number;
  /**
     * Propiedad del DTO que representa longitud_destino.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() longitud_destino: number;
  /**
     * Propiedad del DTO que representa hora_salida.
     * Tipo esperado: Date.
     */
    @ApiProperty() @IsDateString() hora_salida: Date;
  /**
     * Propiedad del DTO que representa hora_llegada.
     * Tipo esperado: Date.
     */
    @ApiProperty() @IsDateString() hora_llegada: Date;
  /**
     * Propiedad del DTO que representa horas_pactadas_cargue.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() horas_pactadas_cargue: number;
  /**
     * Propiedad del DTO que representa horas_pactadas_descargue.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber() horas_pactadas_descargue: number;
  /**
     * Propiedad del DTO que representa exoneracion_legal.
     * Tipo esperado: string.
     */
    @ApiProperty({ required: false }) @IsOptional() @IsString() exoneracion_legal?: string;
}
