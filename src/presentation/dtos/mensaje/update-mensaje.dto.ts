import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateMensajeDto {
  @ApiProperty({ example: 1, description: 'ID del mensaje a actualizar' })
  @IsNumber({}, { message: 'El id debe ser un número' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID del chat asociado' })
  @IsNumber({}, { message: 'fk_chat debe ser un número' })
  fk_chat: number;

  @ApiProperty({ example: '¿Cómo estás?', description: 'Pregunta del mensaje' })
  @IsNotEmpty({ message: 'La pregunta es obligatoria' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La pregunta no puede superar los 255 caracteres' })
  pregunta: string;

  @ApiProperty({ example: 'Estoy bien, gracias.', description: 'Respuesta del mensaje' })
  @IsNotEmpty({ message: 'La respuesta es obligatoria' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @MaxLength(255, { message: 'La respuesta no puede superar los 255 caracteres' })
  respuesta: string;
}
