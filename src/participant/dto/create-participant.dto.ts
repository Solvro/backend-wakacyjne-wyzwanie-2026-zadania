import {IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsEmail} from 'class-validator';
import { Role } from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class CreateParticipantDto {
    @IsInt( { message: 'Trip ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Trip ID jest wymagany' } )
    @ApiProperty({
      description: 'ID podróży',
      example: 1
    })
    trip_id!: number;

    @IsString( { message: 'Nazwa musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Nazwa jest wymagana' } )
    @ApiProperty({
      description: 'Nazwa uczestnika',
      example: 'Jan Kowalski'
    })
    name!: string;

    @IsEmail( {}, { message: 'Email musi być poprawnym adresem email' } )
    @IsOptional( { message: 'Email jest opcjonalny' } )
    @ApiProperty({
      description: 'Email uczestnika',
      example: 'jan.kowalski@example.com'
    })
    email?: string;

    @IsEnum(Role, { message: 'Role musi być poprawną wartością enum (ORGANIZER, MEMBER)' } )
    @IsNotEmpty( { message: 'Role jest wymagana' } )
    @ApiProperty({
      description: 'Rola uczestnika',
      example: 'MEMBER',
      enum: Role
    })
    role!: Role;
}
