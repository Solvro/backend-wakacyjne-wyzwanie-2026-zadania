import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "generated/prisma/enums";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @Roles(UserRole.MOD, UserRole.ADMIN)
  @ApiOperation({
    summary: "Update user data",
    description: "User can change only theier own data",
  })
  @ApiResponse({
    status: 200,
    description: "User updated successfull",
  })
  updateProfile(
    @Req() req: { user: { id: number } },
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(req.user.id, dto);
  }
}
