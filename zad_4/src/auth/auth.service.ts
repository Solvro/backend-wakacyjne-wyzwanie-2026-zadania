import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./strategies/jwt.strategy";

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

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };
    return this.jwtService.sign(payload, {
      expiresIn: parseInt(process.env.EXPIRY_TIME_MS as string) / 1000, // Takes in seconds
      secret: process.env.JWT_SECRET as string,
    });
  }
}
