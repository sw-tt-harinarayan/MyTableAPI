import {
  ApiTags,
  ApiConsumes,
  ApiResponse,
  ApiOperation,
} from "@nestjs/swagger";
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  HttpStatus,
  UploadedFile,
  InternalServerErrorException,
} from "@nestjs/common";

import { USER } from "src/lang/en";
import UserService from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginateUserDto } from "./dto/paginate-user.dto";

@ApiTags("User CRUD")
@Controller("user")
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER.created,
  })
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) createUserDto.profileImage = profileImage.filename;

    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get user list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.found,
  })
  findAll(@Query() query: PaginateUserDto) {
    try {
      const sortOption = query?.sort.split(",");
      const options = {
        page: query?.page || 1,
        limit: query?.limit || 10,
        sort: { [sortOption[0]]: sortOption[1] },
      };

      return this.userService.findAll(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user details" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.found,
  })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch("edit/:id")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update user details" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.updated,
  })
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) updateUserDto.profileImage = profileImage.filename;
    else delete updateUserDto.profileImage;

    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.deleted,
  })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
