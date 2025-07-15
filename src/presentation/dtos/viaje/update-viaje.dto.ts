import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateViajeDto {
  @ApiProperty({ example: 1, description: 'ID del viaje' })
  @IsInt({ message: 'El id debe ser un número entero' })
  id_viaje: number;

  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @IsInt({ message: 'El fk_usuario debe ser un número entero' })
  fk_usuario: number;

  @ApiProperty({ example: 1, description: 'ID del manifiesto' })
  @IsInt({ message: 'El fk_manifiesto debe ser un número entero' })
  fk_manifiesto: number;

  @ApiProperty({ example: 1, description: 'ID del cliente' })
  @IsInt({ message: 'El fk_cliente debe ser un número entero' })
  fk_cliente: number;

  @ApiProperty({ example: 1, description: 'ID del origen' })
  @IsInt({ message: 'El fk_origen debe ser un número entero' })
  fk_origen: number;

  @ApiProperty({ example: 2, description: 'ID del destino' })
  @IsInt({ message: 'El fk_destino debe ser un número entero' })
  fk_destino: number;

  @ApiProperty({ example: 'VJ-001', description: 'Código del viaje' })
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  codigo: string;

  @ApiProperty({ example: 'Observaciones actualizadas', required: false })
  @IsString({ message: 'Las observaciones deben ser una cadena de texto' })
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ example: true, description: 'Estado del viaje' })
  @IsBoolean({ message: 'El estado_viaje debe ser un valor booleano' })
  estado_viaje: boolean;

  @ApiProperty({ example: 'Producto actualizado', description: 'Producto' })
  @IsString({ message: 'El producto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El producto es requerido' })
  producto: string;

  @ApiProperty({ example: 'Detalle actualizado', required: false })
  @IsString({ message: 'El detalle_producto debe ser una cadena de texto' })
  @IsOptional()
  detalle_producto?: string;

  @ApiProperty({ example: 'Calle nueva 456 #78-90', description: 'Dirección de llegada' })
  @IsString({ message: 'La dirección de llegada debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección de llegada es requerida' })
  direccion_llegada: string;

  @ApiProperty({ example: '2025-07-08T12:00:00Z', description: 'Fecha de salida' })
  @IsDateString({}, { message: 'La fecha_salida debe ser una fecha válida' })
  fecha_salida: Date;

  @ApiProperty({ example: '2025-07-09T20:00:00Z', description: 'Fecha de llegada' })
  @IsDateString({}, { message: 'La fecha_llegada debe ser una fecha válida' })
  fecha_llegada: Date;
}
