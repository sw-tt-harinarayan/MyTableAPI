import mongoose from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { USER } from "src/lang/en";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userModel.create(createUserDto);

      return { body: user, message: USER.created };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
