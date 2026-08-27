import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import {IsString, IsNotEmpty, IsDateString, IsNumber} from 'class-validator'

export class UpdateTripDto extends PartialType(CreateTripDto) {
}
