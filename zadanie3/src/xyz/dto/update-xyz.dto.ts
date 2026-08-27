import { PartialType } from '@nestjs/mapped-types';
import { CreateXyzDto } from './create-xyz.dto';

export class UpdateXyzDto extends PartialType(CreateXyzDto) {}