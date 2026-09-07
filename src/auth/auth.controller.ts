import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthLoginDto } from './dto/auth-login.dto.js';
import { AuthRegisterDto } from './dto/auth-register.dto.js';
import { AuthGuard } from './auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('user')
  updateProfile(@Request() req, @Body() authLoginDto: AuthLoginDto) {
    return this.authService.update(req.user.sub, authLoginDto);
  }
}
