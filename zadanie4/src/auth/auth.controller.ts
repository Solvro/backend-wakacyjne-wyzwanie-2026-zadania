import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Autoryzacja (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Rejestracja nowego użytkownika' })
  @ApiResponse({ status: 201, description: 'Użytkownik pomyślnie zarejestrowany.' })
  @ApiResponse({ status: 409, description: 'Email jest już zajęty.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  @ApiOperation({ summary: 'Logowanie użytkownika' })
  @ApiResponse({ status: 200, description: 'Zwraca token JWT.' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowe dane logowania.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}