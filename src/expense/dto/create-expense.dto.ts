import {IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsEmail} from 'class-validator';
import { Category } from '@prisma/client';

export class CreateExpenseDto {
    @IsInt( { message: 'Trip ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Trip ID jest wymagany' } )
    trip_id!: number;

    @IsInt( { message: 'Payer ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Payer ID jest wymagany' } )
    payer_id!: number;

    @IsInt( { message: 'Ilość musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Ilość jest wymagana' } )
    amount!: number;

    @IsEnum(Category, { message: 'Kategoria musi być poprawną wartością enum (FOOD, TRANSPORT, ACCOMMODATION, TICKETS, OTHER' } )
    @IsNotEmpty( { message: 'Kategoria jest wymagana' } )
    category!: Category;

    @IsString( { message: 'Opis musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Opis jest wymagany' } )
    description!: string;

    @IsDateString({}, { message: 'Data utworzenia musi być poprawną datą (YYYY-MM-DD)' })
    @IsNotEmpty( { message: 'Data utworzenia jest wymagana' } )
    created_at!: string;
}
