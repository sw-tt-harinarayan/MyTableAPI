import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumberString, IsEnum } from "class-validator";

import { SortByFoodItem } from "src/configs/enums";

export default class PaginateFoodItemDto {
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

  @IsEnum(SortByFoodItem)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortByFoodItem,
    type: "string",
    description: "Sort by",
    example: SortByFoodItem.CREATED_DESC,
  })
  sort: SortByFoodItem;
}
