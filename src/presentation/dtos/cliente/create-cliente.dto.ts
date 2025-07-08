import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  @IsNumber({}, { message: 'El campo fk_usuario debe ser un número' })
  @IsNotEmpty({ message: 'El campo fk_usuario es obligatorio' })
  fk_usuario: number;

  @ApiProperty({ example: '901234567', description: 'NIT del cliente' })
  @IsString({ message: 'El campo nit debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nit es obligatorio' })
  nit: string;

  @ApiProperty({ example: 'Empresa XYZ', description: 'Nombre del cliente' })
  @IsString({ message: 'El campo nombre_cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo nombre_cliente es obligatorio' })
  nombre_cliente: string;

  @ApiProperty({ example: '3123456789', description: 'Teléfono del cliente' })
  @IsString({ message: 'El campo telefono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo telefono es obligatorio' })
  telefono: string;
}
