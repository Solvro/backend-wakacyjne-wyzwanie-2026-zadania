import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account. The email must not already be in use',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'A user with the given email already exists',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOperation({
    summary: 'Log in',
    description: 'Verifies credentials and returns a JWT access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns an access token',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password',
  })
  login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
