import { IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { sortByUser } from "src/configs/constants";
import PaginateDto from "src/utils/dto/paginate.dto";

export default class PaginateUserDto extends PaginateDto {
  @IsEnum(sortByUser)
  @IsOptional()
  @ApiPropertyOptional({
    enum: sortByUser,
    type: "string",
    description: "Sort by",
    example: sortByUser.CREATED_DESC,
  })
  sort: string;
}
