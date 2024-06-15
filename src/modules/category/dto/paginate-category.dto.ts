import { IsEnum, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

import PaginateDto from "src/utils/dto/paginate.dto";
import { sortByCategory } from "src/configs/constants";

export default class PaginateCategoryDto extends PaginateDto {
  @IsEnum(sortByCategory)
  @IsOptional()
  @ApiPropertyOptional({
    enum: sortByCategory,
    type: "string",
    description: "Sort by",
    example: sortByCategory.CREATED_DESC,
  })
  sort: string;
}
