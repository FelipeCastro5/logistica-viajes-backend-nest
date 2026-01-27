import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsObject, IsArray, ArrayMinSize, ArrayMaxSize, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Nl2sqlContextDto {
  @ApiPropertyOptional({
    description: 'Bounding box [minLng, minLat, maxLng, maxLat]',
    example: [-74.1, 4.5, -74.0, 4.7],
    type: [Number],
    minItems: 4,
    maxItems: 4,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  bbox?: [number, number, number, number];

  @ApiPropertyOptional({
    description: 'Filtros adicionales',
    example: { year: 2024 },
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;
}


export class Nl2sqlRequestDto {
    @ApiProperty({
        description: 'ID del proyecto',
        example: 1,
    })
    @IsNumber()
    projectId: number;

    @ApiProperty({
        description: 'Pregunta en lenguaje natural',
        example: 'avaluo promedio por barrio',
    })
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiPropertyOptional({
        description: 'Contexto opcional (geográfico, filtros, etc)',
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => Nl2sqlContextDto)
    context?: Nl2sqlContextDto;

    @ApiPropertyOptional({
        description: 'Devuelve información adicional para debugging (solo no-prod)',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    debug?: boolean;
}
