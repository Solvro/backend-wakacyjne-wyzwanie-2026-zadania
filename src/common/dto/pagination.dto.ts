import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class PaginationMetaDto {
  @ApiPropertyOptional({ example: 42, description: 'Total number of items' })
  total: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page number' })
  page: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  limit: number;

  @ApiPropertyOptional({ example: 5, description: 'Total number of pages' })
  totalPages: number;
}
