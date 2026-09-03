import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Rejestracja nowego użytkownika' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Użytkownik został pomyślnie zarejestrowany.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Niepoprawne dane wejściowe (błąd walidacji).',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Użytkownik z tym adresem email już istnieje.',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logowanie użytkownika i wygenerowanie tokenu JWT' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logowanie udane, zwraca token dostępowy JWT.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Nieprawidłowe dane logowania.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Niepoprawne dane wejściowe (błąd walidacji).',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
