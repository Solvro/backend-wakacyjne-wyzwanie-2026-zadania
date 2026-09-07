import { PartialType } from '@nestjs/mapped-types';
import { AuthLoginDto } from '../../auth/dto/auth-login.dto';

export class UpdateUserDto extends PartialType(AuthLoginDto) {}
