import { Body, Controller, Patch, Post, Req, UnauthorizedException } from '@nestjs/common';
import { register } from 'module';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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

    @Patch('user')
    async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
        return this.usersService.update(req.user.id, dto)
    }
}
