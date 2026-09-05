import { Controller, Post, Body, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }
}

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}  
    
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch()
    updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
        return this.userService.update(req.user.id, dto);
}
}
