import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserEntity } from "src/user/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register as a new user",
    description: "Add an expense to the database.",
  })
  @ApiResponse({
    status: 201,
    description: "User registered succesfully",
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: "Email is already used",
  })
  async register(@Body() dto: RegisterDto): Promise<UserEntity | undefined> {
    return this.authService.register(dto);
  }
}
