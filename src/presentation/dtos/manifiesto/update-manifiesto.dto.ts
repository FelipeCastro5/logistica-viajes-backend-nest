import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateManifiestoDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateManifiestoDto {
  /**
     * Propiedad del DTO que representa id_manifiesto.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1 })
  @IsInt()
  id_manifiesto: number;

  /**
     * Propiedad del DTO que representa fk_vehiculo.
     * Tipo esperado: number.
     */
    @ApiProperty({
    example: 3, required: false, description: 'ID del vehículo',
  }) @IsInt() fk_vehiculo?: number;

  /**
     * Propiedad del DTO que representa flete_total.
     * Tipo esperado: number.
     */
    @ApiProperty() @IsNumber({}, { message: 'Flete total debe ser un número válido' }) flete_total: number;
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
}
