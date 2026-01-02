import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMercanciaPeligrosaDto {
  @ApiProperty({ example: 10, description: 'ID de la remesa asociada' })
  @IsNumber({}, { message: 'fk_remesa debe ser un número' })
  @IsNotEmpty({ message: 'fk_remesa es obligatorio' })
  fk_remesa: number;

  @ApiProperty({ example: 'UN 1203', description: 'Código UN' })
  @IsString({ message: 'codigo_un debe ser texto' })
  @IsNotEmpty({ message: 'codigo_un es obligatorio' })
  codigo_un: string;

  @ApiProperty({ example: 'Clase 3', description: 'Grupo de riesgo' })
  @IsString({ message: 'grupo_riesgo debe ser texto' })
  @IsNotEmpty({ message: 'grupo_riesgo es obligatorio' })
  grupo_riesgo: string;

  @ApiProperty({
    example: 'Líquido inflamable',
    description: 'Característica de peligrosidad',
  })
  @IsString({ message: 'caracteristica_peligrosidad debe ser texto' })
  @IsNotEmpty({
    message: 'caracteristica_peligrosidad es obligatoria',
  })
  caracteristica_peligrosidad: string;

  @ApiProperty({
    example: 'Bidón metálico',
    description: 'Tipo de embalaje o envase',
  })
  @IsString({ message: 'embalaje_envase debe ser texto' })
  @IsNotEmpty({ message: 'embalaje_envase es obligatorio' })
  embalaje_envase: string;
}
