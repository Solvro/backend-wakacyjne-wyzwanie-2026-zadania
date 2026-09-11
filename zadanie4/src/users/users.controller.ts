import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('Użytkownik (User)')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Aktualizacja profilu zalogowanego użytkownika' })
  @ApiResponse({ status: 200, description: 'Dane użytkownika zostały pomyślnie zaktualizowane.' })
  @ApiResponse({ status: 400, description: 'Nieprawidłowe dane wejściowe.' })
  @ApiResponse({ status: 401, description: 'Brak autoryzacji.' })
  @ApiResponse({ status: 409, description: 'Adres email jest już zajęty.' })
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = Number(req.user.sub);
    return this.userService.update(userId, dto);
  }
}