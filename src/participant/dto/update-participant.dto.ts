import { PartialType } from '@nestjs/swagger';
import { CreateParticipantDto } from './create-participant.dto.js';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}