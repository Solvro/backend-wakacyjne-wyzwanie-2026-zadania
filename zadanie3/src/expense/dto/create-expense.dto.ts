import { Type } from '../../generated/prisma/enums'
import { IsNumber, IsNotEmpty, IsEnum, IsPositive} from 'class-validator'
import { ApiProperty} from '@nestjs/swagger'
import { Expose } from 'class-transformer';

export class CreateExpenseDto {

    @Expose()
    @IsEnum(Type, {message: "Type must be selected from: ACCOMMODATION, TRANSPORTATION, FOOD"})
    @ApiProperty({
        enum: ['ACCOMODATION', 'TRANSPORTATION', 'FOOD'],
        description: 'The type of expense selected from: ACCOMMODATION, TRANSPORTATION, FOOD',
        example: 'ACCOMMODATION'
    })
    type!: Type

    @Expose()
    @IsNotEmpty({message: "Amount can't be empty"})
    @IsNumber()
    @IsPositive({message: "Amount must be greater than 0"})
    @ApiProperty({
        description: 'The amount of money',
        example: '8000'
    })
    amount!: number

    @Expose()
    @IsNotEmpty({message: "TripId can't be empty"})
    @IsNumber()
    @ApiProperty({
        description: 'The trip ID',
        example: '3'
    })
    tripId!: number

}
