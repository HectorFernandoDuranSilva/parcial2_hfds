import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CrearRecintoDto {
  @ApiProperty({ example: 'Teatro Gran Mariscal', maxLength: 100 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString() @IsNotEmpty() @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Sucre', maxLength: 50 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString() @IsNotEmpty() @MaxLength(50)
  ciudad: string;

  @ApiPropertyOptional({ example: 500, nullable: true })
  @IsOptional() @IsInt() @Min(1) @Max(2147483647)
  aforo_maximo?: number | null;
}
export class ActualizarRecintoDto extends PartialType(CrearRecintoDto, { skipNullProperties: false }) {}

