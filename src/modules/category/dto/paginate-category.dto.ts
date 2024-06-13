import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumberString, IsEnum } from "class-validator";

import { SortByCategory } from "src/configs/enums";

export default class PaginateCategoryDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    type: "number",
    description: "Page number",
  })
  page: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 10,
    type: "number",
    description: "Per page data",
  })
  limit: number;

  @IsEnum(SortByCategory)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortByCategory,
    type: "string",
    description: "Sort by",
    example: SortByCategory.CREATED_DESC,
  })
  sort: SortByCategory;
}
