import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from '../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Rejestracja nowego użytkownika' })
  @ApiCreatedResponse({
    description: 'Użytkownik został pomyślnie zarejestrowany.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Nieprawidłowe dane wejściowe.' })
  @ApiConflictResponse({
    description: 'Użytkownik z tym adresem email już istnieje.',
  })
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logowanie użytkownika i pobranie tokenu JWT' })
  @ApiOkResponse({
    description: 'Pomyślnie zalogowano, zwraca token JWT.',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Nieprawidłowe dane wejściowe.' })
  @ApiUnauthorizedResponse({ description: 'Nieprawidłowy email lub hasło.' })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
