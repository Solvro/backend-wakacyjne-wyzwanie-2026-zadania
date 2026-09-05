import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  // activates first to check
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if there is a @Public decorator skip checking
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
  // activates after canActivate
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
