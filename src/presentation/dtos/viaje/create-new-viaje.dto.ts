import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateNewViajeDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateNewViajeDto {
  /**
     * Propiedad del DTO que representa fk_usuario.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del usuario' })
  @IsInt({ message: 'El fk_usuario debe ser un número entero' })
  fk_usuario: number;

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
    @ApiProperty({ example: 'Observaciones del viaje', required: false })
  @IsString({ message: 'Las observaciones deben ser una cadena de texto' })
  @IsOptional()
  observaciones?: string;

  // @ApiProperty({ example: true, description: 'Estado del viaje' })
  // @IsBoolean({ message: 'El estado_viaje debe ser un valor booleano' })
  // estado_viaje: boolean;

  /**
     * Propiedad del DTO que representa producto.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Producto transportado', description: 'Producto' })
  @IsString({ message: 'El producto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El producto es requerido' })
  producto: string;

  /**
     * Propiedad del DTO que representa detalle_producto.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Detalle del producto', required: false })
  @IsString({ message: 'El detalle_producto debe ser una cadena de texto' })
  @IsOptional()
  detalle_producto?: string;

  /**
     * Propiedad del DTO que representa direccion_llegada.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Calle 123 #45-67', description: 'Dirección de llegada' })
  @IsString({ message: 'La dirección de llegada debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección de llegada es requerida' })
  direccion_llegada: string;

  /**
     * Propiedad del DTO que representa fecha_salida.
     * Tipo esperado: Date.
     */
    @ApiProperty({ example: '2025-07-08T10:00:00Z', description: 'Fecha de salida' })
  @IsDateString({}, { message: 'La fecha_salida debe ser una fecha válida' })
  fecha_salida: Date;

  /**
     * Propiedad del DTO que representa fecha_llegada.
     * Tipo esperado: Date.
     */
    @ApiProperty({ example: '2025-07-09T18:00:00Z', description: 'Fecha de llegada' })
  @IsDateString({}, { message: 'La fecha_llegada debe ser una fecha válida' })
  fecha_llegada: Date;

  /**
     * Propiedad del DTO que representa latitud_origen.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  latitud_origen: number;

  /**
     * Propiedad del DTO que representa longitud_origen.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  longitud_origen: number;

  /**
     * Propiedad del DTO que representa latitud_destino.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  latitud_destino: number;

  /**
     * Propiedad del DTO que representa longitud_destino.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  longitud_destino: number;

  /**
     * Propiedad del DTO que representa hora_salida.
     * Tipo esperado: Date.
     */
    @ApiProperty()
  @IsDateString()
  hora_salida: Date;

  /**
     * Propiedad del DTO que representa hora_llegada.
     * Tipo esperado: Date.
     */
    @ApiProperty()
  @IsDateString()
  hora_llegada: Date;

  /**
     * Propiedad del DTO que representa horas_pactadas_cargue.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  horas_pactadas_cargue: number;

  /**
     * Propiedad del DTO que representa horas_pactadas_descargue.
     * Tipo esperado: number.
     */
    @ApiProperty()
  @IsNumber()
  horas_pactadas_descargue: number;

  /**
     * Propiedad del DTO que representa exoneracion_legal.
     * Tipo esperado: string.
     */
    @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  exoneracion_legal?: string;

  // ========================
  // MANIFIESTO
  // ========================

  /**
     * Propiedad del DTO que representa fk_vehiculo.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 3, required: false, description: 'Vehículo asociado al manifiesto',
  })
  @IsInt() @IsOptional() fk_vehiculo?: number;

  /**
     * Propiedad del DTO que representa flete_total.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({ maxDecimalPlaces: 5 }, { message: 'Flete total debe ser un número decimal válido' }) flete_total: number;
  /**
     * Propiedad del DTO que representa porcentaje_retencion_fuente.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Porcentaje retención fuente debe ser un número válido' }) porcentaje_retencion_fuente: number;
  /**
     * Propiedad del DTO que representa valor_retencion_fuente.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Valor retención fuente debe ser un número válido' }) valor_retencion_fuente: number;
  /**
     * Propiedad del DTO que representa porcentaje_ica.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Porcentaje ICA debe ser un número válido' }) porcentaje_ica: number;
  /**
     * Propiedad del DTO que representa valor_ica.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Valor ICA debe ser un número válido' }) valor_ica: number;
  /**
     * Propiedad del DTO que representa deduccion_fiscal.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Deducción fiscal debe ser un número válido' }) deduccion_fiscal: number;
  /**
     * Propiedad del DTO que representa neto_a_pagar.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Neto a pagar debe ser un número válido' }) neto_a_pagar: number;
  /**
     * Propiedad del DTO que representa anticipo.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Anticipo debe ser un número válido' }) anticipo: number;
  /**
     * Propiedad del DTO que representa saldo_a_pagar.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Saldo a pagar debe ser un número válido' }) saldo_a_pagar: number;
  /**
     * Propiedad del DTO que representa total_gastos.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Total gastos debe ser un número válido' }) total_gastos: number;
  /**
     * Propiedad del DTO que representa queda_al_carro.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Queda al carro debe ser un número válido' }) queda_al_carro: number;
  /**
     * Propiedad del DTO que representa a_favor_del_carro.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'A favor del carro debe ser un número válido' }) a_favor_del_carro: number;
  /**
     * Propiedad del DTO que representa porcentaje_conductor.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Porcentaje conductor debe ser un número válido' }) porcentaje_conductor: number;
  /**
     * Propiedad del DTO que representa ganancia_conductor.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Ganancia conductor debe ser un número válido' }) ganancia_conductor: number;

  // ========================
  // REMESA
  // ========================

  /**
     * Propiedad del DTO que representa numero_remesa.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  numero_remesa: string;

  /**
     * Propiedad del DTO que representa numero_autorizacion.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  numero_autorizacion: string;

  /**
     * Propiedad del DTO que representa tipo_empaque.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  tipo_empaque: string;

  /**
     * Propiedad del DTO que representa naturaleza_carga.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  naturaleza_carga: string;

  /**
     * Propiedad del DTO que representa codigo_armonizado.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  codigo_armonizado: string;

  /**
     * Propiedad del DTO que representa cantidad.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber()
  cantidad: number;

  /**
     * Propiedad del DTO que representa unidad_medida.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  unidad_medida: string;

  /**
     * Propiedad del DTO que representa peso_total.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber()
  peso_total: number;

  /**
     * Propiedad del DTO que representa mercancia_peligrosa.
     * Tipo esperado: boolean.
     */
    @ApiProperty() @IsBoolean()
  mercancia_peligrosa: boolean;

  /**
     * Propiedad del DTO que representa observaciones_remesa.
     * Tipo esperado: string.
     */
    @ApiProperty() @IsString()
  observaciones_remesa: string;

  // ========================
  // MERCANCÍA PELIGROSA
  // ========================

  /**
     * Propiedad del DTO que representa codigo_un.
     * Tipo esperado: string.
     */
    @ValidateIf(o => o.tiene_mercancia_peligrosa)
  @ApiProperty({ required: false })
  @IsString()
  codigo_un?: string;

  /**
     * Propiedad del DTO que representa grupo_riesgo.
     * Tipo esperado: string.
     */
    @ValidateIf(o => o.tiene_mercancia_peligrosa)
  @ApiProperty({ required: false })
  @IsString()
  grupo_riesgo?: string;

  /**
     * Propiedad del DTO que representa caracteristica_peligrosidad.
     * Tipo esperado: string.
     */
    @ValidateIf(o => o.tiene_mercancia_peligrosa)
  @ApiProperty({ required: false })
  @IsString()
  caracteristica_peligrosidad?: string;

  /**
     * Propiedad del DTO que representa embalaje_envase.
     * Tipo esperado: string.
     */
    @ValidateIf(o => o.tiene_mercancia_peligrosa)
  @ApiProperty({ required: false })
  @IsString()
  embalaje_envase?: string;
}
