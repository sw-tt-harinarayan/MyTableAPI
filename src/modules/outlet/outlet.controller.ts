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
  Delete,
  Controller,
  HttpStatus,
  UploadedFiles,
} from "@nestjs/common";

import { OUTLET } from "src/lang/en";
import { Role } from "src/configs/enums";
import OutletService from "./outlet.service";
import CreateOutletDto from "./dto/create-outlet.dto";
import UpdateOutletDto from "./dto/update-outlet.dto";
import Roles from "src/utils/decorators/roles.decorator";

@ApiBearerAuth()
@Roles(Role.ADMIN)
@ApiTags("Outlet CRUD")
@Controller("outlet")
export default class OutletController {
  constructor(private readonly outletService: OutletService) {}

  @Post("create")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create outlet" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: OUTLET.created,
  })
  create(@Body() createOutletDto: CreateOutletDto, @UploadedFiles() files: []) {
    if (files.length)
      createOutletDto.images = files.map((image: any) => image.filename);

    return this.outletService.create(createOutletDto);
  }

  @Get("list")
  @ApiOperation({ summary: "Get outlet list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: OUTLET.found,
  })
  findAll() {
    return this.outletService.findAll();
  }

  @Get("view/:id")
  findOne(@Param("id") id: string) {
    return this.outletService.findOne(id);
  }

  @Patch("edit/:id")
  update(@Param("id") id: string, @Body() updateOutletDto: UpdateOutletDto) {
    return this.outletService.update(id, updateOutletDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.outletService.remove(id);
  }
}
