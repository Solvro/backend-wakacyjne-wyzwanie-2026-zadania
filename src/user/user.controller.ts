import { Controller, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Użytkownik (User)')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Edytuj swój własny profil' })
  updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
