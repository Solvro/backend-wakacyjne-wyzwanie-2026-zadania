import { Controller, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiProperty } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  @ApiProperty({ description: 'Update user profile'})
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
}
}
