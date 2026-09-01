import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../generated/prisma/enums';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreatePersonDto {
    @ApiProperty()
    @IsNumber({}, { message: "ID must be a number" })    
    id!: number;
    @ApiProperty()
    @IsString({ message: "First name must be a string" })
    first_name!: string;
    @ApiProperty()
    @IsString({ message: "Last name must be a string" })
    last_name!: string;
    @ApiProperty()
    dob!: Date;
    @ApiProperty({enum: ['MALE', 'FEMALE', 'OTHER']})
    @IsEnum(Gender, { message: "Gender must be one of MALE, FEMALE, OTHER" })
    gender!: Gender;
}
