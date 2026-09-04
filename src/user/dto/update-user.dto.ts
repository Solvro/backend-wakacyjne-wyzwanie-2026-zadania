import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
