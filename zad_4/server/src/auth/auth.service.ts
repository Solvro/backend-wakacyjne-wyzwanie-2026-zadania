import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity | undefined> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      email: registerDto.email,
      name: registerDto.name,
      hashed_password: hashedPassword,
      role: "USER",
    });
  }

  async login(loginDto: LoginDto) {
    const ERR_MESSAGE = "Wrong email or password";
    const user = await this.userService.findByEmail(loginDto.email);
    if (user === null) {
      throw new UnauthorizedException(ERR_MESSAGE);
    }
    const isCorrect = await bcrypt.compare(
      loginDto.password,
      user.hashed_password,
    );
    if (!isCorrect) {
      throw new UnauthorizedException(ERR_MESSAGE);
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, { expiresIn: "1h" });
  }
}
