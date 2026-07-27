import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

/**
 * Data Transfer Object (DTO) para UpdateUsuarioDto.
 * Define la estructura de los datos esperados en las peticiones HTTP y facilita la validación.
 */
export class UpdateUsuarioDto {
  /**
     * Propiedad del DTO que representa id.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 5, description: 'ID del usuario que se va a actualizar' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero.' })
  id: number;

  /**
     * Propiedad del DTO que representa fk_tipodoc.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: '1', description: 'Tipo de documento (CC, TI, etc.)' })
  @IsInt({ message: 'El tipo de documento debe ser un número entero.' })
  @IsOptional()
  fk_tipodoc: number;

  /**
     * Propiedad del DTO que representa num_doc.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '1234567890', description: 'Número de documento' })
  @IsString({ message: 'El número de documento debe ser una cadena de texto.' })
  num_doc: string;

  /**
     * Propiedad del DTO que representa fk_rol.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 1, description: 'ID del rol asociado' })
  @IsInt({ message: 'El rol debe ser un número entero.' })
  @IsOptional()
  fk_rol: number;

  /**
     * Propiedad del DTO que representa fk_contador.
     * Tipo esperado: number.
     */
    @ApiProperty({ example: 2, description: 'ID del contador asociado' })
  @IsInt({ message: 'El contador debe ser un número entero.' })
  @IsOptional()
  fk_contador: number;

  /**
     * Propiedad del DTO que representa p_nombre.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Juan', description: 'Primer nombre del usuario' })
  @IsString({ message: 'El primer nombre debe ser una cadena de texto.' })
  @Length(1, 20, { message: 'El primer nombre debe tener entre 1 y 20 caracteres.' })
  p_nombre: string;

  /**
     * Propiedad del DTO que representa s_nombre.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Carlos', description: 'Segundo nombre del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser una cadena de texto.' })
  @Length(0, 20, { message: 'El segundo nombre no puede tener más de 20 caracteres.' })
  s_nombre?: string;

  /**
     * Propiedad del DTO que representa p_apellido.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'Pérez', description: 'Primer apellido del usuario' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto.' })
  @Length(1, 20, { message: 'El primer apellido debe tener entre 1 y 20 caracteres.' })
  p_apellido: string;

  /**
     * Propiedad del DTO que representa s_apellido.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: 'García', description: 'Segundo apellido del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto.' })
  @Length(0, 20, { message: 'El segundo apellido no puede tener más de 20 caracteres.' })
  s_apellido?: string;

  /**
     * Propiedad del DTO que representa telefono.
     * Tipo esperado: string.
     */
    @ApiProperty({ example: '+573001234567', description: 'Número de teléfono del usuario' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  telefono: string;

  // Campos descomentables si decides permitir actualizar correo/contraseña
  // @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  // correo: string;

  // @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  // @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
  // contrasena: string;
}
