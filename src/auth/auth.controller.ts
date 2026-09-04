import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Incorrect input data' })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and acquire JWT token' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiResponse({ status: 404, description: 'User does not exist' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
