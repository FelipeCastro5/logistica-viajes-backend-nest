import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateMensajeDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateMensajeDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del mensaje a actualizar' })
  @IsNumber({}, { message: 'El id debe ser un número' })
  id: number;

  /**
     * Propiedad del DTO que representa fk_chat.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del chat asociado' })
  @IsNumber({}, { message: 'fk_chat debe ser un número' })
  fk_chat: number;

  /**
     * Propiedad del DTO que representa pregunta.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '¿Cómo estás?', description: 'Pregunta del mensaje' })
  @IsNotEmpty({ message: 'La pregunta es obligatoria' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La pregunta no puede superar los 255 caracteres' })
  pregunta: string;

  /**
     * Propiedad del DTO que representa respuesta.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Estoy bien, gracias.', description: 'Respuesta del mensaje' })
  @IsNotEmpty({ message: 'La respuesta es obligatoria' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La respuesta no puede superar los 255 caracteres' })
  respuesta: string;
}
