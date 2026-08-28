import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateParticipantDto {
    @ApiProperty({ example: 'Dawid', description: 'Imię uczestnika wycieczki'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Citak', description: 'Nazwisko uczestnika wycieczki'})
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({ example: 'dawid.citak@wp.pl', description: 'Email uczestnika wycieczki'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12121212121', description: 'Pesel uczestnika wycieczki'})
    @IsString()
    @Length(11, 11)
    @IsNotEmpty()
    pesel: string;

    @ApiProperty({ example: '+48111111111', description: 'Numer Telefonu uczestnika wycieczki'})
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({ example: 1, description: 'ID wycieczki, do której przypisany jest uczestnik'})
    @IsInt()
    trip_id: number;
}
