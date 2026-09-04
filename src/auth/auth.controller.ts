import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth-dto';
import { CustomJwtGuard } from './custom-jwt.guard';
import { UpdateAuthDto } from './dto/update-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('auth/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(CustomJwtGuard)
  @Patch('user')
  updateProfile(@Req() req, @Body() dto: UpdateAuthDto) {
    return this.authService.update(req.user.id, dto);
  }
}
