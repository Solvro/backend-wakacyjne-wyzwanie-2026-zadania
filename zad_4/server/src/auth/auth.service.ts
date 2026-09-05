import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto): Promise<UserEntity | undefined> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      email: registerDto.email,
      name: registerDto.name,
      hashed_password: hashedPassword,
      role: "USER",
    });
  }
}
