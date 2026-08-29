import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateParticipantDto {
  @ApiProperty({
    example: 'Cezary',
    description: 'Imię uczestnika wycieczki',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Baryka',
    description: 'Nazwisko uczestnika wycieczki',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 1,
    description: 'Id wycieczki, do której przypisany jest uczestnik',
  })
  @IsInt()
  trip_id: number;
}
