import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * Clase de infraestructura: ConfigPostgresDto.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
export class ConfigPostgresDto {
  @IsString()
  @IsNotEmpty()
  readonly host: string;

  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly database: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsInt()
  @IsNotEmpty()
  readonly port: number;
}