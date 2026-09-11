import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'jan.kowalski@example.com' })
  email: string;

  @Exclude()
  password: string;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}