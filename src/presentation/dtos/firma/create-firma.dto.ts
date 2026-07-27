import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateFirmaDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateFirmaDto {
  /**
     * Propiedad del DTO que representa fk_viaje.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 10, description: 'ID del viaje asociado' })
  @IsNumber({}, { message: 'El campo fk_viaje debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_viaje es obligatorio' })
  fk_viaje: number;

  /**
     * Propiedad del DTO que representa tipo_firma.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'Conductor',
    description: 'Tipo de firma (Conductor, Remitente, Destinatario, etc.)',
  })
  @IsString({ message: 'El campo tipo_firma debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo tipo_firma es obligatorio' })
  tipo_firma: string;

  /**
     * Propiedad del DTO que representa firma_digital.
     * Tipo esperado: string.
     */
    @ApiProperty({
    example: 'base64_string_o_url',
    description: 'Firma digital en Base64 o URL',
  })
  @IsString({ message: 'El campo firma_digital debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo firma_digital es obligatorio' })
  firma_digital: string;
}
