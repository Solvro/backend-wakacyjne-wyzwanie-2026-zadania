import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
  @IsEmail({}, { message: 'Niepoprawny format email' })
  @IsNotEmpty( { message: 'Email jest wymagany' })
  @ApiProperty({example : "user@example.com", description: 'Adres email użytkownika'})
  email!: string;

  @IsString({ message: 'Hasło musi być ciągiem znaków' })
  @MinLength(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
  @ApiProperty({example : "password123", description: 'Hasło użytkownika'})
  password!: string;
}