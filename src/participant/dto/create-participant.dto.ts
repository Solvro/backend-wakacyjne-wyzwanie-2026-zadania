import {IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsEmail} from 'class-validator';
import { Role } from "@prisma/client";

export class CreateParticipantDto {
    @IsInt( { message: 'Trip ID musi być liczbą całkowitą' } )
    @IsNotEmpty( { message: 'Trip ID jest wymagany' } )
    trip_id!: number;

    @IsString( { message: 'Nazwa musi być ciągiem znaków' } )
    @IsNotEmpty( { message: 'Nazwa jest wymagana' } )
    name!: string;

    @IsEmail( {}, { message: 'Email musi być poprawnym adresem email' } )
    @IsOptional( { message: 'Email jest opcjonalny' } )
    email?: string;

    @IsEnum(Role, { message: 'Role musi być poprawną wartością enum (ORGANIZER, MEMBER)' } )
    @IsNotEmpty( { message: 'Role jest wymagana' } )
    role!: Role;
}
