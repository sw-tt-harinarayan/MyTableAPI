import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  HttpStatus,
} from "@nestjs/common";

import { USER } from "src/lang/en";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("User CRUD")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create your account" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER.created,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch("edit/:id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
