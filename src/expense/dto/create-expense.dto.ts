import {IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsEmail} from 'class-validator';
import { Category } from '@prisma/client';
import {ApiProperty} from "@nestjs/swagger";

export class CreateExpenseDto {
    @IsInt( { message: 'Trip ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Trip ID jest wymagany' } )
    @ApiProperty({
        description: 'ID podróży, do której należy wydatek',
        example: 1
    })
    trip_id!: number;

    @IsInt( { message: 'Payer ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Payer ID jest wymagany' } )
    @ApiProperty({
        description: 'ID uczestnika, który poniósł wydatek',
        example: 1
    })
    payer_id!: number;

    @IsInt( { message: 'Ilość musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Ilość jest wymagana' } )
    @ApiProperty({
        description: 'Kwota wydatku',
        example: 100
    })
    amount!: number;

    @IsEnum(Category, { message: 'Kategoria musi być poprawną wartością enum (FOOD, TRANSPORT, ACCOMMODATION, TICKETS, OTHER' } )
    @IsNotEmpty( { message: 'Kategoria jest wymagana' } )
    @ApiProperty({
        description: 'Kategoria wydatku',
        example: 'FOOD',
        enum: Category
    })
    category!: Category;

    @IsString( { message: 'Opis musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Opis jest wymagany' } )
    @ApiProperty({
        description: 'Opis wydatku',
        example: 'Obiad w restauracji'
    })
    description!: string;

    @IsDateString({}, { message: 'Data utworzenia musi być poprawną datą (YYYY-MM-DDTHH:MM:SSZ)' })
    @IsNotEmpty( { message: 'Data utworzenia jest wymagana' } )
    @ApiProperty({
        description: 'Data utworzenia wydatku',
        example: '2024-07-01T00:00:00Z'
    })
    created_at!: string;
}
