import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @ApiPropertyOptional({ description: 'Number of items to skip', example: 1 })
    offset?: number;


    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @ApiPropertyOptional({ description: 'Maximum number of items to return', example: 10 })
    limit?: number;
}