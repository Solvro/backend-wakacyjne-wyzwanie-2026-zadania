import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Min, IsDateString, IsNumber, IsInt, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty({ example: 10.22, description: 'Wydana kwota', minimum: 0.01})
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    price: number;

    @ApiProperty({ example: 1, description: 'ID uczestnika, który zapłacił'})
    @IsInt()
    paid_by_id: number;

    @ApiProperty({ example: "2026-09-01", description: 'Data dokonania płatności'})
    @IsDateString()
    date: string;

    @ApiPropertyOptional({ example: "Obiad"})
    @IsString()
    @IsOptional()
    description?: string;

}
