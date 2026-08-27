import {IsString, IsNumber,IsDateString, IsEnum, IsOptional, IsInt} from 'class-validator'
import { Category, Currency } from '../../../generated/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateExpenseDto {

    @ApiProperty()
    @IsNumber()
    amount!: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?:string

    @ApiProperty()
    @IsDateString()
    expenseDate!: string

    @ApiPropertyOptional({
        enum: Category,
        example: Category.MISCELLANEOUS_COSTS
    })
    @IsOptional()
    @IsEnum(Category)
    category?: Category

    @ApiPropertyOptional({
        enum:Currency,
        example: Currency.PLN
    }
    )
    @IsOptional()
    @IsEnum(Currency)
    currency?:Currency

    @ApiProperty()
    @IsInt()
    tripId!: number

    @ApiProperty()
    @IsInt()
    paidById!: number


}
