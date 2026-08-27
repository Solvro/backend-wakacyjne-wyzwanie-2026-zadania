import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; 
import { IsString, IsNotEmpty, IsNumber, IsOptional, MinLength, Min } from 'class-validator';

export class CreateXyzDto {
  @ApiProperty({ 
    description: 'nazwa', 
    example: 'przyklad' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ 
    description: 'cena', 
    example: 67 
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ 
    description: 'opisss', 
    example: 'opis' 
  })
  @IsString()
  @IsOptional()
  description?: string;
}