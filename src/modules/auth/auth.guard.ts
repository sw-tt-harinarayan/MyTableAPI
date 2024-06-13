import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import UserService from "../user/user.service";
import { User } from "../user/schemas/user.schema";
import { jwtConstants } from "src/configs/constants";
import { IS_PUBLIC_KEY } from "src/utils/decorators/public.decorator";
import { extractDataFromObject } from "src/utils/helpers/common-helper";

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true; // Skip authentication for public routes

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const { email }: any = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user: User = await this.userService.findByEmail(email);

      request.user = extractDataFromObject(user, [
        "id",
        "role",
        "email",
        "fullName",
      ]);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
