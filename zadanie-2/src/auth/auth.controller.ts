import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { register } from 'module';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    signUp(@Body() dto: RegisterDto) {
        return this.authService.signUp(dto)
    }

    @Post('login')
    signIn(@Body() dto: LoginDto) {
        return this.authService.signIn(dto)
    }
}
