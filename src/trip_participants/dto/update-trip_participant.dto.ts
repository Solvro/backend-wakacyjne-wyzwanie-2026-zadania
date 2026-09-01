import { PartialType } from '@nestjs/mapped-types';
import { CreateTripParticipantDto } from './create-trip_participant.dto';

export class UpdateTripParticipantDto extends PartialType(CreateTripParticipantDto) {}
