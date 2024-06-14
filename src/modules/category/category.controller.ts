import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpStatus,
  Controller,
  UploadedFile,
  InternalServerErrorException,
} from "@nestjs/common";

import { CATEGORY } from "src/lang/en";
import { Role } from "src/configs/enums";
import CategoryService from "./category.service";
import Roles from "src/utils/decorators/roles.decorator";
import CreateCategoryDto from "./dto/create-category.dto";
import UpdateCategoryDto from "./dto/update-category.dto";
import PaginateCategoryDto from "./dto/paginate-category.dto";

@ApiBearerAuth()
@Roles(Role.ADMIN)
@Controller("category")
@ApiTags("Category CRUD")
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CATEGORY.created,
  })
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) createCategoryDto.image = image.filename;

    return this.categoryService.create(createCategoryDto);
  }

  @Get("list")
  @ApiOperation({ summary: "Get category list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CATEGORY.found,
  })
  findAll(@Query() query: PaginateCategoryDto) {
    try {
      const sortOption = query?.sort.split(",");
      const options = {
        page: query?.page || 1,
        limit: query?.limit || 10,
        sort: { [sortOption[0]]: sortOption[1] },
      };

      return this.categoryService.findAll(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category details" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CATEGORY.found,
  })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch("edit/:id")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update category details" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CATEGORY.updated,
  })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) updateCategoryDto.image = image.filename;
    else delete updateCategoryDto.image;

    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CATEGORY.deleted,
  })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
