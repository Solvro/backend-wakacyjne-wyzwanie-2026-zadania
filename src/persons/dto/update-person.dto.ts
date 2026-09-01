import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Gender } from '../../generated/prisma/enums';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
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
