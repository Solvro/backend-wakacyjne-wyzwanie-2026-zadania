import { Body, Controller, Inject, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}
  
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const userByEmail = await this.usersService.findOneByEmailWithPwHash(createUserDto.email);
    if (userByEmail != null) {
      response.status(409);
      return;
    }
    const dbUser = await this.usersService.create(createUserDto);
    return this.authService.login(createUserDto.email, Number(dbUser.id));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user.email, req.user.id);
  }
}
