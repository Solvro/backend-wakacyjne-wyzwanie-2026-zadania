import {Controller, Post, Body, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpCode} from "@nestjs/common/decorators";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({
        summary: "Rejestracja nowego użytkownika",
        description: "Tworzy nowego użytkownika w systemie. Wymagane pola: email i hasło."
    })
    @ApiResponse({
        status: 201,
        description: "Użytkownik został pomyślnie zarejestrowany."
    })
    @ApiResponse({
        status: 400,
        description: "Niepoprawne dane wejściowe. Sprawdź format email i długość hasła."
    })
    @ApiResponse({
        status: 409,
        description: "Użytkownik z tym adresem email już istnieje."
    })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Logowanie użytkownika",
        description: "Weryfikuje dane logowania użytkownika i zwraca token JWT w przypadku sukcesu. Wymagane pola: email i hasło."
    })
    @ApiResponse({
        status: 200,
        description: "Pomyślne logowanie. Zwraca token JWT."
    })
    @ApiResponse({
        status: 401,
        description: "Niepoprawny email lub hasło."
    })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
