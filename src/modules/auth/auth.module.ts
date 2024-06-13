import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import AuthService from "./auth.service";
import UserModule from "../user/user.module";
import AuthController from "./auth.controller";
import { jwtConstants } from "src/configs/constants";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export default class AuthModule {}
