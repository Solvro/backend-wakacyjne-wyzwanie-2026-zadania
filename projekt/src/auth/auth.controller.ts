import { Body, Controller, Post, HttpCode, HttpStatus, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwtAuth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'New User registration' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login and JWT token creating' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  @ApiOperation({ summary: 'User data update' })
  updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.authService.updateProfile(userId, updateUserDto);
  }

}
