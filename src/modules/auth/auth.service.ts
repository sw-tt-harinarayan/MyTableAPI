// import { Injectable, UnauthorizedException } from "@nestjs/common";

// import UserService from "../user/user.service";

// @Injectable()
// export default class AuthService {
//   constructor(private usersService: UserService) {}

//   async signIn(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findByEmail(username);
//     if (user?.password !== pass) throw new UnauthorizedException();

//     const { password, ...result } = user;
//     return result;
//   }
// }

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { LoginDto } from "./dto/auth.dto";
import UserService from "../user/user.service";
import { User } from "../user/schemas/user.schema";

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn({ email, password }: LoginDto) {
    const user: User = await this.usersService.findByEmail(email);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    delete user.password;
    const payload = { email: user.email };
    user.token = await this.jwtService.signAsync(payload);

    return {
      body: user,
      message: "You are logged in successfully.",
    };
  }
}