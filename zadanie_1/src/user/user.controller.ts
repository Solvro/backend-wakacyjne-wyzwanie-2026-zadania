import { Controller, Patch, Body, Req, UseGuards, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // PUBLICZNE: Każdy może pobrać profil podając ID w URL, np. GET /api/v1/user/1
  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // PRYWATNE: Tylko zalogowany użytkownik może edytować swój własny profil
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    const userId = req.user?.id || req.user?.sub;
    return this.userService.update(userId, dto);
  }
}