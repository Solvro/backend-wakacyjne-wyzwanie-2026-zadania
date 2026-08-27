import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from '@prisma/client';
import { IsNumber, IsEnum, IsInt, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 150.5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @ApiProperty({ enum: CurrencyEnum, example: CurrencyEnum.PLN })
  @IsEnum(CurrencyEnum)
  currency!: CurrencyEnum;

  @ApiProperty({ example: 1 })
  @IsInt()
  participant_id!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  trip_id!: number;
}
