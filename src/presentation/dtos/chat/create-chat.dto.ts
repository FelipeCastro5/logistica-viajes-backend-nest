import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

/**
 * Data Transfer Object (DTO) para CreateChatDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class CreateChatDto {
  /**
     * Propiedad del DTO que representa fk_usuario.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del usuario al que pertenece el chat' })
  @IsInt({ message: 'El campo fk_usuario debe ser un número entero' })
  @Min(1, { message: 'El campo fk_usuario debe ser mayor que 0' })
  fk_usuario: number;

  /**
     * Propiedad del DTO que representa nombre_chat.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Chat general', description: 'Nombre del chat' })
  @IsString({ message: 'El campo nombre_chat debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre_chat no debe estar vacío' })
  nombre_chat: string;
}
