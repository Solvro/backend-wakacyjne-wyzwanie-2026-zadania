import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';

export class UpdateParticipantDto extends PartialType(
  OmitType(CreateParticipantDto, ['tripUuid', 'userUuid'] as const),
) {}
