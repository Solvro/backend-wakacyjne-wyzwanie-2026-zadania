import { IsString, IsNumber, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Nazwa wydatku', example: 'Kolacja' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ description: 'Cena', example: 150.50 })
  @IsNumber()
  @Min(0.01)
  price!: number;

  @ApiProperty({ description: 'Typ wydatku', example: 'Jedzenie' })
  @IsString()
  @MaxLength(50)
  type_of_expense!: string;
}