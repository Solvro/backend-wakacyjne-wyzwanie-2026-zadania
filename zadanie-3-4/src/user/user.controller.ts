import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParseEmailPipe } from './parse-email.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a user by email address' })
  @ApiParam({
    name: 'email',
    required: true,
    example: 'jan.kowalski@example.com',
    description: 'Email address of the user to search for',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findByEmail(
    @Param('email', ParseEmailPipe) email: string,
  ): Promise<User> {
    return await this.userService.findByEmail(email);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current logged-in user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile has been successfully updated',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation failed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - User with this email already exists',
  })
  async updateProfile(@Req() req: { user: User }, @Body() dto: UpdateUserDto) {
    return await this.userService.update(req.user.uuid, dto);
  }
}
