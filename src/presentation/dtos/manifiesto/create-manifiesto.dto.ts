import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateManifiestoDto {
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 5 }, { message: 'Flete total debe ser un número decimal válido' }) flete_total: number;
  @ApiProperty() @IsNumber({}, { message: 'Porcentaje retención fuente debe ser un número válido' }) porcentaje_retencion_fuente: number;
  @ApiProperty() @IsNumber({}, { message: 'Valor retención fuente debe ser un número válido' }) valor_retencion_fuente: number;
  @ApiProperty() @IsNumber({}, { message: 'Porcentaje ICA debe ser un número válido' }) porcentaje_ica: number;
  @ApiProperty() @IsNumber({}, { message: 'Valor ICA debe ser un número válido' }) valor_ica: number;
  @ApiProperty() @IsNumber({}, { message: 'Deducción fiscal debe ser un número válido' }) deduccion_fiscal: number;
  @ApiProperty() @IsNumber({}, { message: 'Neto a pagar debe ser un número válido' }) neto_a_pagar: number;
  @ApiProperty() @IsNumber({}, { message: 'Anticipo debe ser un número válido' }) anticipo: number;
  @ApiProperty() @IsNumber({}, { message: 'Saldo a pagar debe ser un número válido' }) saldo_a_pagar: number;
  @ApiProperty() @IsNumber({}, { message: 'Total gastos debe ser un número válido' }) total_gastos: number;
  @ApiProperty() @IsNumber({}, { message: 'Queda al carro debe ser un número válido' }) queda_al_carro: number;
  @ApiProperty() @IsNumber({}, { message: 'A favor del carro debe ser un número válido' }) a_favor_del_carro: number;
  @ApiProperty() @IsNumber({}, { message: 'Porcentaje conductor debe ser un número válido' }) porcentaje_conductor: number;
  @ApiProperty() @IsNumber({}, { message: 'Ganancia conductor debe ser un número válido' }) ganacia_conductor: number;
}
