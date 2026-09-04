import {Body, Controller, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-user.dto';
import {LoginDto} from "./dto/login.dto";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {UpdateUserDto} from "./dto/update-user-dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('user')
    @ApiOperation({
        summary: 'Aktualizacja własnego profilu',
        description: 'Pozwala zalogowanemu użytkownikowi zaktualizować swoje własne dane.',
    })
    updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
        return this.authService.updateProfile(req.user.id, dto);
    }
}