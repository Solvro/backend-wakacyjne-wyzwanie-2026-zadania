import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

@ApiTags('user')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Brak autoryzacji / Token wygasł.' })
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz profil zalogowanego użytkownika' })
  @ApiOkResponse({
    description: 'Dane zalogowanego użytkownika.',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Użytkownik nie został znaleziony.' })
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.findById(req.user.id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Aktualizacja profilu zalogowanego użytkownika (PATCH /user)',
  })
  @ApiOkResponse({
    description: 'Profil użytkownika został pomyślnie zaktualizowany.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Nieprawidłowe dane wejściowe.' })
  @ApiConflictResponse({
    description: 'Użytkownik z tym adresem email już istnieje.',
  })
  @ApiNotFoundResponse({ description: 'Użytkownik nie został znaleziony.' })
  updateProfile(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
