import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty({ example: 5, description: 'ID del usuario que se va a actualizar' })
  @IsInt()
  id: number;

  @ApiProperty({ example: '1', description: 'Tipo de documento (CC, TI, etc.)' })
  @IsString()
  fk_tipodoc: number;

  @ApiProperty({ example: '1234567890', description: 'Número de documento' })
  @IsString()
  num_doc: string;

  @ApiProperty({ example: 1, description: 'ID del rol asociado' })
  @IsInt()
  fk_rol: number;

  @ApiProperty({ example: 2, description: 'ID del contador asociado' })
  @IsInt()
  fk_contador: number;

  @ApiProperty({ example: 'Juan', description: 'Primer nombre del usuario' })
  @IsString()
  @Length(1, 20)
  p_nombre: string;

  @ApiProperty({ example: 'Carlos', description: 'Segundo nombre del usuario', required: false })
  @IsOptional()
  @IsString()
  @Length(0, 20)
  s_nombre?: string;

  @ApiProperty({ example: 'Pérez', description: 'Primer apellido del usuario' })
  @IsString()
  @Length(1, 20)
  p_apellido: string;

  @ApiProperty({ example: 'García', description: 'Segundo apellido del usuario', required: false })
  @IsOptional()
  @IsString()
  @Length(0, 20)
  s_apellido?: string;

  @ApiProperty({ example: '+573001234567', description: 'Número de teléfono del usuario' })
  @IsString()
  telefono: string;

  @ApiProperty({ example: 'juan.perez@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'NuevaClave456!', description: 'Nueva contraseña del usuario' })
  @IsString()
  @Length(6, 50)
  contrasena: string;
}
