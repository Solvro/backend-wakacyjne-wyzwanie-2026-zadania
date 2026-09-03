import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'New User registration' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login and JWT token creating' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
