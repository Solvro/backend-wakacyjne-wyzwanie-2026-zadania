import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTripDto {
    @IsString( { message: 'Miejsce docelowe musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Miejsce docelowe jest wymagane' } )
    destination!: string;

    @IsDateString({}, { message: 'Data rozpoczęcia musi być poprawną datą (YYYY-MM-DD)' } )
    @IsNotEmpty( { message: 'Data rozpoczęcia jest wymagana' } )
    start_date!: string;

    @IsDateString({}, { message: 'Data zakończenia musi być poprawną datą (YYYY-MM-DD)' } )
    @IsNotEmpty( { message: 'Data zakończenia jest wymagana' } )
    end_date!: string;

    @IsEnum(Status , { message: 'Status musi być poprawną wartością enum (PLANNED, ACTIVE, COMPLETED, CANCELED)' } )
    @IsNotEmpty( { message: 'Status jest wymagany' } )
    status!: Status;
}
