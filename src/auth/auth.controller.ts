import { Controller, Post, Body, HttpStatus, HttpCode, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign_in.dto';
import { SignUpDto } from './dto/sign_up.dto';
import { AuthGuard } from './auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto){ 
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body()signUpDto:SignUpDto){
    return this.authService.signUp(signUpDto.email, signUpDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  
}

