import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from '../auth/dto/user-response.dto';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Patch()
  @ApiOperation({ summary: 'Aktualizacja własnych danych zalogowanego użytkownika' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profil użytkownika został pomyślnie zaktualizowany.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Niepoprawne dane wejściowe.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Podany adres email jest już zajęty przez innego użytkownika.',
  })
  updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
