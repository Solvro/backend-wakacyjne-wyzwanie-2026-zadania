import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthLoginDto } from './dto/auth-login.dto.js';
import { AuthRegisterDto } from './dto/auth-register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.signIn(authLoginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }
}
