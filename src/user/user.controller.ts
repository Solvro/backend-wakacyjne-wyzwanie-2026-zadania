import { Controller, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser {
  user: { id: number; email: string };
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 400, description: 'Missing old password' })
  @ApiResponse({ status: 401, description: 'Invalid old password or token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateProfile(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
