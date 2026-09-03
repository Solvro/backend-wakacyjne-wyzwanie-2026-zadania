import { PartialType } from '@nestjs/swagger';
import { CreateParticipantDto } from './create-participant.dto';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}
