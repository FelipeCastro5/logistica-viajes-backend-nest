import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateMensajeDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateMensajeDto {
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
    @ApiProperty({ example: '¿Cuál es tu nombre?', description: 'Pregunta del mensaje' })
  @IsNotEmpty({ message: 'La pregunta es obligatoria' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La pregunta no puede superar los 255 caracteres' })
  pregunta: string;

  /**
     * Propiedad del DTO que representa respuesta.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Mi nombre es Juan.', description: 'Respuesta del mensaje' })
  @IsNotEmpty({ message: 'La respuesta es obligatoria' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La respuesta no puede superar los 255 caracteres' })
  respuesta: string;
}
