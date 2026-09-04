import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

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
}
