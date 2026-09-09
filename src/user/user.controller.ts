import { Controller, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch()
    @ApiOperation({
        summary: 'Aktualizacja profilu',
        description: 'Pozwala zalogowanemu użytkownikowi zmienić swój email lub hasło.',
    })
    updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
        return this.userService.update(req.user.id, dto);
    }
}