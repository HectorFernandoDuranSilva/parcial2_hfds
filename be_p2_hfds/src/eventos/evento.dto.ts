import { Transform } from 'class-transformer';
import { IsInt, Min, Max, IsString, IsNotEmpty, MaxLength, IsNumber, IsDateString, Matches, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EstadoEvento, CategoriaEvento } from './evento-cultural.entity';

export class CrearEventoDto {
  @ApiProperty({ example: 1 })
  @IsInt() @Min(1) @Max(2147483647)
  id_recinto: number;

  @ApiProperty({ example: 'Noche de música', maxLength: 150 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString() @IsNotEmpty() @MaxLength(150)
  titulo: string;

  @ApiProperty({ example: 'Orquesta local', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString() @IsNotEmpty() @MaxLength(100)
  artista_principal: string;

  @ApiProperty({ example: 90 })
  @IsInt() @Min(1) @Max(2147483647)
  duracion_minutos: number;

  @ApiProperty({ example: 50.50 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Max(99999999.99)
  precio_entrada: number;

  @ApiProperty({ example: '2026-11-20', format: 'date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsDateString({ strict: true })
  fecha_evento: string;

  @ApiProperty({ enum: CategoriaEvento, example: 'concierto' })
  @IsEnum(CategoriaEvento)
  categoria_evento: CategoriaEvento;

  @ApiProperty({ enum: EstadoEvento })
  @IsEnum(EstadoEvento)
  estado: EstadoEvento;
}
export class ActualizarEventoDto extends PartialType(CrearEventoDto, { skipNullProperties: false }) {}

