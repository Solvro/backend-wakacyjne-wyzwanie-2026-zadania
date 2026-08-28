import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTripDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  @MaxLength(100, {
    message: 'title must be at most 100 characters in length',
  })
  title!: string;

  @Type(() => Date)
  @IsDate({ message: 'startDate must be a valid date' })
  @IsNotEmpty({ message: 'startDate is required' })
  startDate!: Date;

  @Type(() => Date)
  @IsDate({ message: 'endDate must be a valid date' })
  @IsNotEmpty({ message: 'endDate is required' })
  endDate!: Date;
}
