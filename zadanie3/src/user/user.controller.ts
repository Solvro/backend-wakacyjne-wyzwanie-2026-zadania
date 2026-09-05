import { Controller, Body, Post, UseGuards, Patch, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ApiOperation, ApiResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.authguard'
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';

@Controller()
export class UserController {

  constructor( private userService: UserService) {}

  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in to use more options'
  })
  @ApiResponse({
    status: 200,
    description: 'You have successfully signed in',
  })
  async signIn(@Body() signInDto: SignInDto){

    return this.userService.signIn(signInDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Sign up',
    description: 'Create a new user'
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async registration(@Body() registrationDto: RegistrationDto){

    return this.userService.registration(registrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto){

    return this.userService.update(req.user!.id, updateUserDto);
  }
}
