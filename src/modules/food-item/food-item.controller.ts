import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { FOOD_ITEM } from "src/lang/en";
import { Role } from "src/configs/enums";
import FoodItemService from "./food-item.service";
import Roles from "src/utils/decorators/roles.decorator";
import UpdateFoodItemDto from "./dto/update-food-item.dto";
import CreateFoodItemDto from "./dto/create-food-item.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiBearerAuth()
@Roles(Role.ADMIN)
@ApiTags("Food Item CRUD")
@Controller("food-item")
export default class FoodItemController {
  constructor(private readonly foodItemService: FoodItemService) {}

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create food item" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: FOOD_ITEM.created,
  })
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() createFoodItemDto: CreateFoodItemDto,
    @UploadedFiles() files: [],
  ) {
    if (files.length)
      createFoodItemDto.images = files.map((image: any) => image.filename);

    return this.foodItemService.create(createFoodItemDto);
  }

  @Get("list")
  @ApiOperation({ summary: "Get food item list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: FOOD_ITEM.found,
  })
  findAll() {
    return this.foodItemService.findAll();
  }

  @Get("view/:id")
  findOne(@Param("id") id: string) {
    return this.foodItemService.findOne(id);
  }

  @Patch("edit/:id")
  update(
    @Param("id") id: string,
    @Body() updateFoodItemDto: UpdateFoodItemDto,
  ) {
    return this.foodItemService.update(id, updateFoodItemDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.foodItemService.remove(id);
  }
}
