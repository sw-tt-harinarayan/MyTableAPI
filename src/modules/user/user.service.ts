import * as bcrypt from "bcrypt";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";

import { USER } from "src/lang/en";
import { User } from "./schemas/user.schema";
import CreateUserDto from "./dto/create-user.dto";
import UpdateUserDto from "./dto/update-user.dto";

@Injectable()
export default class UserService {
  constructor(@InjectModel(User.name) private userModel: PaginateModel<User>) {}

  async create(createUserDto: CreateUserDto) {
    let user: User = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (user) throw new BadRequestException("Email already exist");

    try {
      user = await this.userModel.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 12),
      });

      return { body: user, message: USER.created };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(options: any) {
    const users = await this.userModel.paginate({}, options);

    return { body: users, message: USER.found };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(USER.notFound);

    return { body: user, message: USER.found };
  }

  async findByEmail(email: string) {
    const user: any = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException(USER.notFound);

    return user.toJSON();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user: User;

    try {
      user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!user) throw new NotFoundException(USER.notFound);

    return { body: user, message: USER.updated };
  }

  async remove(id: string) {
    let user: User;

    try {
      user = await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!user) throw new NotFoundException(USER.notFound);

    return { body: user, message: USER.deleted };
  }
}
