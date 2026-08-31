import { IsString, IsNotEmpty, MaxLength, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'The first name of the participant',
    example: 'Nigga',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName!: string;

  @ApiProperty({
    description: 'The last name of the participant',
    example: 'Nogger',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName!: string;

  @ApiProperty({
    description: 'The unique identifier of the trip the participant is joining',
    example: 5,
  })
  @IsInt()
  @IsPositive() 
  @IsNotEmpty()
  tripId!: number;

}