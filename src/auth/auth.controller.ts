import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Zarejestruj nowego użytkownika' })
  @ApiResponse({ status: 201, description: 'Użytkownik został utworzony' })
  @ApiResponse({ status: 409, description: 'Użytkownik o tym emailu już istnieje' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Zaloguj użytkownika' })
  @ApiResponse({ status: 200, description: 'Zwraca token JWT' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowe dane logowania' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}