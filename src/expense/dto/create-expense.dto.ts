import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty({
    example: 'Hotel Malediwy',
    description: 'The title or name of the expense.',
    })
    @IsString({message: 'must be string'})
    @IsNotEmpty({message: 'must contain something'})
    @MaxLength(100)
    title!: string;

    @ApiProperty({
      example: '2250.55',
      description: 'The amount of the expense.'
    })
    @IsNumber()
    @Min(0)
    @Max(99999)
    amount!: number;

    @ApiProperty({
      example: '2026-07-01T21:12:00.000Z',
      description: 'The date of the expense.'
    })
    @IsDateString()
  	depositDate!: Date;

    @ApiProperty({
      example: '1',
      description: 'The ID of the participant associated with this expense.'
    })
    @IsInt()
  	tripParticipantId!: number;
}
