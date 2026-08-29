import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateExpenseDto {
  @ApiProperty({
    example: 10.0,
    description: 'Kwota danej transakcji, wydatku',
  })
  @IsNotEmpty()
  @IsNumber()
  ammount: number;

  @ApiProperty({
    example: 'Zakup w sklepie spożywczym',
    description: 'Tytuł transakcji, wydatku którego dokonał uczestnik',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 1,
    description: 'ID wycieczki, na której wykonano wydatku',
  })
  @IsInt()
  trip_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID uczestnika, który dokonał wydatku',
  })
  @IsInt()
  payer_id: number;
}
