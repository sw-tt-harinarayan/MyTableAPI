import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";

import AuthService from "./auth.service";
import { LoginDto } from "./dto/auth.dto";
import { Public } from "src/utils/decorators/public.decorator";

@Controller("auth")
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }
}
