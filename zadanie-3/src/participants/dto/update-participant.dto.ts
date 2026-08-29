import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateParticipantDto } from './create-participant.dto';

export class UpdateParticipantDto extends PartialType(
  OmitType(CreateParticipantDto, ['tripUuid', 'userUuid'] as const),
) {}
