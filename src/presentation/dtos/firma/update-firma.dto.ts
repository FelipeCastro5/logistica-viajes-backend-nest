import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateFirmaDto {
  @ApiProperty({ example: 1, description: 'ID de la firma a actualizar' })
  @IsNumber({}, { message: 'El campo id debe ser un número' })
  @IsNotEmpty({ message: 'El campo id es obligatorio' })
  id: number;

  @ApiProperty({ example: 10, description: 'ID del viaje asociado' })
  @IsNumber({}, { message: 'El campo fk_viaje debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_viaje es obligatorio' })
  fk_viaje: number;

  @ApiProperty({
    example: 'Destinatario',
    description: 'Tipo de firma',
  })
  @IsString({ message: 'El campo tipo_firma debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo tipo_firma es obligatorio' })
  tipo_firma: string;

  @ApiProperty({
    example: 'base64_string_o_url',
    description: 'Firma digital',
  })
  @IsString({ message: 'El campo firma_digital debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo firma_digital es obligatorio' })
  firma_digital: string;
}
