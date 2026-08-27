import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateExpenseDto {
    @IsNumber()
    @IsPositive()
    value!: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description!: string;

    @IsInt()
    participantId!: number;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod!: PaymentMethod;
}
