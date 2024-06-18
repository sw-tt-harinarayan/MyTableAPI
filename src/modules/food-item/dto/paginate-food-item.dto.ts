import { IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

import PaginateDto from "src/utils/dto/paginate.dto";
import { sortByFoodItem } from "src/configs/constants";

export default class PaginateFoodItemDto extends PaginateDto {
  @IsEnum(sortByFoodItem)
  @IsOptional()
  @ApiPropertyOptional({
    enum: sortByFoodItem,
    type: "string",
    description: "Sort by",
    example: sortByFoodItem.CREATED_DESC,
  })
  sort: string;
}
