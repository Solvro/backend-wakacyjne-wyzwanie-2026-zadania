import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Hasło musi mieć minimum 6 znaków' })
  password?: string;
}
