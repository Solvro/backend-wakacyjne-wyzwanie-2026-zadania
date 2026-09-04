import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty()
    @IsNumber({}, { message: "ID must be a number" })
    id!: number;
    @ApiProperty()
    @IsNumber({}, { message: "Trip ID must be a number" })
    trip_id!: number;
    @ApiProperty()
    @IsString({ message: "Name must be a string"})
    @IsNotEmpty({ message: "Name cannot be empty" })
    name!: string;
    @ApiProperty()
    @IsNumber({}, { message: "Value must be a number" })
    value!: number;
}
