import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest<TUser>(err: Error, user: TUser, info: unknown): TUser {
    if (info instanceof Error && info.name === "TokenExpiredError") {
      throw new UnauthorizedException("Token expired");
    }

    if (err || !user) {
      throw err || new UnauthorizedException("Access forbiden or bad token");
    }

    return user;
  }
}
