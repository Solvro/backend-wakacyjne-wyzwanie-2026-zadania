import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';
import {ApiProperty} from "@nestjs/swagger";

export class CreateTripDto {
    @IsString( { message: 'Miejsce docelowe musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Miejsce docelowe jest wymagane' } )
    @ApiProperty({
      description: 'Miejsce docelowe podróży',
      example: 'Warszawa'
    })
    destination!: string;

    @IsDateString({}, { message: 'Data rozpoczęcia musi być poprawną datą (YYYY-MM-DDTHH:MM:SSZ)' } )
    @IsNotEmpty( { message: 'Data rozpoczęcia jest wymagana' } )
    @ApiProperty({
      description: 'Data rozpoczęcia podróży',
      example: '2024-07-01T00:00:00Z'
    })
    start_date!: string;

    @IsDateString({}, { message: 'Data zakończenia musi być poprawną datą (YYYY-MM-DDTHH:MM:SSZ)' } )
    @IsNotEmpty( { message: 'Data zakończenia jest wymagana' } )
    @ApiProperty({
      description: 'Data zakończenia podróży',
      example: '2024-07-01T00:00:00Z'
    })
    end_date!: string;

    @IsEnum(Status , { message: 'Status musi być poprawną wartością enum (PLANNED, ACTIVE, COMPLETED, CANCELED)' } )
    @IsNotEmpty( { message: 'Status jest wymagany' } )
    @ApiProperty({
      description: 'Status podróży',
      example: 'PLANNED',
      enum: Status
    })
    status!: Status;
}
