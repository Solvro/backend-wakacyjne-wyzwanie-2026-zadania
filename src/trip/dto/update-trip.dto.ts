import { PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto.js';

export class UpdateTripDto extends PartialType(CreateTripDto) {}
